'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, FileDown, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { QuotationData, Item } from '@/components/pdf/QuotationDocument';
import { Textarea } from '@/components/ui/textarea';

// Dynamic import for the download button which encapsulates all PDF logic
const PDFDownloadButton = dynamic(
    () => import('@/components/pdf/PDFDownloadButton'),
    {
        ssr: false,
        loading: () => <Button disabled className="w-full gap-2"><FileDown className="h-4 w-4" />Loading PDF Generator...</Button>
    }
);

export default function CreateQuotePage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<QuotationData>({
        quoteDetails: {
            quoteNumber: "1000136",
            issueDate: "2025-12-16",
            expiryDate: "2026-01-15",
            bidNumber: "351253"
        },
        clientDetails: {
            name: "Francisco Andrade 123",
            addressLine1: "Project Street Sydney 2000",
            phone: "+61 412 123 456"
        },
        companyDetails: {
            name: "JRJ Contractors",
            address: "78B Millicent St, Athol Park, Adelaide, 5012, South Australia",
            email: "info@jrjcontractors.com.au",
            phone: "+61 412 962 127"
        },
        columnHeaders: {
            room: "ROOM",
            description: "DESCRIPTION",
            amount: "AMOUNT"
        },
        items: [
            {
                category: "Kitchen",
                description: "Flat Panel Melamine Doors/ 33mm Laminate Bench Tops\nHettich Soft Close Drawers (1 Bank of 3 drawers) / SoftClose Hinges\n1 X Utensils tray / 1 X Swing Bin door\n2 X Clear Glass Features Doors\nSelection of Standards Handles From Eurofit or Halliday Hardware\nProvisions for Fridge / Dishwasher / Wall Oven & Microwave / Standard Rangehood\nCabinets Finished to ceiling with matching infill",
                amount: 15585.00
            }
        ],
        totalDetails: {
            label: "All Totals Inc GST",
            totalAmount: 21113.00
        },
        taxDetails: {
            enabled: false,
            type: 'percentage',
            value: 10,
            description: 'GST (10%)',
            displayAsSeparateRow: true
        }
    });

    // Helper to update nested state
    const updateQuoteInfo = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, quoteDetails: { ...prev.quoteDetails, [field]: value } }));
    };

    const updateClientInfo = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, clientDetails: { ...prev.clientDetails, [field]: value } }));
    };

    const updateCompanyInfo = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, companyDetails: { ...prev.companyDetails, [field]: value } }));
    };

    const updateColumnHeaders = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, columnHeaders: { ...prev.columnHeaders, [field]: value } }));
    };

    const handleItemChange = (index: number, field: keyof Item, value: any) => {
        setFormData(prev => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            // Auto-calc total? The user provided hardcoded total structure, keeping it manual or calculated would be a choice. 
            // For now, I'll update the total if amount changes.
            if (field === 'amount') {
                const newTotal = newItems.reduce((sum, i) => sum + (i.amount || 0), 0);
                return { ...prev, items: newItems, totalDetails: { ...prev.totalDetails, totalAmount: newTotal } };
            }
            return { ...prev, items: newItems };
        });
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { category: 'New Category', description: '', amount: 0 }]
        }));
    };

    const removeItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const updateTaxDetails = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            taxDetails: { ...prev.taxDetails, [field]: value } as any
        }));
    };

    // Calculate totals for preview
    const calculatePreview = () => {
        const subtotal = formData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
        let taxAmount = 0;
        if (formData.taxDetails?.enabled) {
            if (formData.taxDetails.type === 'percentage') {
                taxAmount = subtotal * (formData.taxDetails.value / 100);
            } else {
                taxAmount = formData.taxDetails.value;
            }
        }
        return { subtotal, taxAmount, total: subtotal + taxAmount };
    };

    const { subtotal, taxAmount, total } = calculatePreview();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Quote saved successfully!');
                router.push('/dashboard/quotes'); // Redirect to history
            } else {
                toast.error('Failed to save quote: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create Quotation (JRJ)</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Details */}
                    <Card>
                        <CardHeader><CardTitle>Quote Details</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Quote Number</Label>
                                <Input value={formData.quoteDetails.quoteNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuoteInfo('quoteNumber', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Bid Number</Label>
                                <Input value={formData.quoteDetails.bidNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuoteInfo('bidNumber', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Issue Date</Label>
                                <Input type="date" value={formData.quoteDetails.issueDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuoteInfo('issueDate', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input type="date" value={formData.quoteDetails.expiryDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuoteInfo('expiryDate', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Client Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={formData.clientDetails.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateClientInfo('name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input value={formData.clientDetails.addressLine1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateClientInfo('addressLine1', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input value={formData.clientDetails.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateClientInfo('phone', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Company Details (Header)</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Company Name</Label>
                                <Input value={formData.companyDetails.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCompanyInfo('name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input value={formData.companyDetails.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCompanyInfo('address', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={formData.companyDetails.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCompanyInfo('email', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input value={formData.companyDetails.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCompanyInfo('phone', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Items */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Items</CardTitle>
                            <Button onClick={addItem} size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {formData.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 p-4 border rounded-lg bg-slate-50/50 relative">
                                    <div className="col-span-3 space-y-2">
                                        <Label>Category</Label>
                                        <Input value={item.category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, 'category', e.target.value)} />
                                    </div>
                                    <div className="col-span-6 space-y-2">
                                        <Label>Description</Label>
                                        <Textarea className="min-h-[80px]" value={item.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleItemChange(index, 'description', e.target.value)} />
                                    </div>
                                    <div className="col-span-3 space-y-2">
                                        <Label>Amount</Label>
                                        <Input
                                            type="number"
                                            value={item.amount === null ? '' : item.amount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const val = e.target.value === '' ? null : parseFloat(e.target.value);
                                                handleItemChange(index, 'amount', val);
                                            }}
                                            placeholder="null"
                                        />
                                    </div>
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeItem(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Table Column Headers Config */}
                    <Card>
                        <CardHeader><CardTitle>Table Columns</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Col 1 Label</Label>
                                <Input value={formData.columnHeaders.room} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateColumnHeaders('room', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Col 2 Label</Label>
                                <Input value={formData.columnHeaders.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateColumnHeaders('description', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Col 3 Label</Label>
                                <Input value={formData.columnHeaders.amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateColumnHeaders('amount', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tax Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Tax Settings</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={formData.taxDetails?.enabled}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTaxDetails('enabled', e.target.checked)}
                                    />
                                    <Label>Enable Tax</Label>
                                </div>
                            </div>
                        </CardHeader>
                        {formData.taxDetails?.enabled && (
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tax Type</Label>
                                        <select
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.taxDetails.type}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateTaxDetails('type', e.target.value)}
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Value ({formData.taxDetails.type === 'percentage' ? '%' : '$'})</Label>
                                        <Input
                                            type="number"
                                            value={formData.taxDetails.value}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTaxDetails('value', parseFloat(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Input
                                            value={formData.taxDetails.description}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTaxDetails('description', e.target.value)}
                                            placeholder="GST (10%)"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <input
                                            type="checkbox"
                                            checked={formData.taxDetails.displayAsSeparateRow}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTaxDetails('displayAsSeparateRow', e.target.checked)}
                                        />
                                        <Label>Show as Separate Row</Label>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="sticky top-24">
                        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>

                            {formData.taxDetails?.enabled && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{formData.taxDetails.description}</span>
                                    <span>${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-end border-t pt-4">
                                <span className="font-bold text-lg">{formData.totalDetails.label}</span>
                                <span className="font-bold text-2xl text-primary">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>

                            {isClient && (
                                <div className="w-full pt-4">
                                    <PDFDownloadButton
                                        key={JSON.stringify(formData)}
                                        data={formData}
                                        fileName={`Quote_${formData.quoteDetails.quoteNumber}.pdf`}
                                    />
                                </div>
                            )}
                            <div className="ml-auto flex space-x-2">
                                <Button
                                    variant="default"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-brand-teal hover:bg-brand-teal/90 text-white w-full py-2"
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    {isSaving ? 'Saving...' : 'Save Quote'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </div >
    );
}
