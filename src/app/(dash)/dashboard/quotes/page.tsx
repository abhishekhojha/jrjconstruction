'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, DollarSign, User, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { QuotationData } from '@/components/pdf/QuotationDocument';

// Dynamic import for PDF generation
const PDFDownloadButton = dynamic(
    () => import('@/components/pdf/PDFDownloadButton'),
    { ssr: false, loading: () => <span className="text-xs text-muted-foreground">Loading PDF...</span> }
);

interface SavedQuote extends QuotationData {
    _id: string;
    createdAt: string;
}

export default function QuotesHistoryPage() {
    const [quotes, setQuotes] = useState<SavedQuote[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 9;

    useEffect(() => {
        fetchQuotes(page);
    }, [page]);

    const fetchQuotes = async (pageNo: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/quotes?page=${pageNo}&limit=${limit}`);
            const data = await res.json();
            if (data.success) {
                setQuotes(data.quotes);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        } finally {
            setLoading(false);
        }
    };

    const performDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                toast.success('Quote deleted');
                fetchQuotes(page);
            } else {
                toast.error('Failed to delete: ' + data.error);
            }
        } catch (error) {
            console.error('Error deleting quote:', error);
            toast.error('An error occurred while deleting.');
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        toast('Are you sure you want to delete this quote?', {
            description: 'This action cannot be undone.',
            action: {
                label: 'Delete',
                onClick: () => performDelete(id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { },
            },
        });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Quotations</h1>
                    <p className="text-muted-foreground">Manage and view your quote history.</p>
                </div>
                <Link href="/dashboard/quotes/create">
                    <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white gap-2">
                        <Plus className="w-4 h-4" /> New Quote
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10 text-muted-foreground">Loading quotes...</div>
            ) : quotes.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No quotes found</h3>
                        <p className="text-muted-foreground mb-4">Create your first quotation to get started.</p>
                        <Link href="/dashboard/quotes/create">
                            <Button variant="outline">Create Quote</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quotes.map((quote) => (
                            <Card key={quote._id} className="hover:shadow-lg transition-shadow relative group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        #{quote.quoteDetails.quoteNumber}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(quote.createdAt!).toLocaleDateString()}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-red-400 hover:text-red-600 hover:bg-red-50"
                                            onClick={(e) => handleDelete(quote._id, e)}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-medium truncate">{quote.clientDetails.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-bold text-lg">
                                                {quote.totalDetails?.totalAmount?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || '$0.00'}
                                            </span>
                                        </div>

                                        <div className="pt-4">
                                            <PDFDownloadButton
                                                key={quote._id}
                                                data={quote}
                                                fileName={`Quote_${quote.quoteDetails.quoteNumber}.pdf`}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-4 pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
