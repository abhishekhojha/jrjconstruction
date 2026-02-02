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
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Quotations</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage and tracked all your construction quotes in one place.</p>
                </div>
                <Link href="/dashboard/quotes/create">
                    <Button className="bg-gradient-to-r from-secondary to-secondary/90 hover:scale-105 transition-all duration-300 text-white gap-2 h-12 px-6 rounded-2xl shadow-xl shadow-secondary/20 font-bold border-none">
                        <Plus className="w-5 h-5" /> New Quotation
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="h-12 w-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                    <p className="text-slate-500 font-bold animate-pulse">Loading your documents...</p>
                </div>
            ) : quotes.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-20 text-center shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5">
                    <div className="h-24 w-24 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">No quotes discovered yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto">Start by creating your first professional quotation for your clients today.</p>
                    <Link href="/dashboard/quotes/create">
                        <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold transition-all hover:scale-105 border-none shadow-xl shadow-primary/20">
                            Create First Quote
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quotes.map((quote) => (
                            <div key={quote._id} className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                {/* Subtle brand glow background */}
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Quote Reference</span>
                                            <span className="text-lg font-black text-slate-800 dark:text-white">#{quote.quoteDetails.quoteNumber}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                            onClick={(e) => handleDelete(quote._id, e)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    <div className="space-y-6 mb-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                                                <User className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Client</span>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{quote.clientDetails.name}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Created Date</span>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    {new Date(quote.createdAt!).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] border border-slate-100 dark:border-white/5">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Amount</span>
                                            <span className="text-2xl font-black text-primary">
                                                {quote.totalDetails?.totalAmount?.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }) || '$0.00'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <PDFDownloadButton
                                            key={quote._id}
                                            data={quote}
                                            fileName={`Quote_${quote.quoteDetails.quoteNumber}.pdf`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - Premium Design */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center py-10">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-2xl p-2 flex items-center space-x-2 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <Button
                                    variant="ghost"
                                    className="rounded-xl h-10 w-10 p-0 text-slate-500 hover:text-primary hover:bg-primary/5 disabled:opacity-30"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <div className="px-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Page <span className="text-primary">{page}</span> of {totalPages}
                                </div>
                                <Button
                                    variant="ghost"
                                    className="rounded-xl h-10 w-10 p-0 text-slate-500 hover:text-primary hover:bg-primary/5 disabled:opacity-30"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                >
                                    Next <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
