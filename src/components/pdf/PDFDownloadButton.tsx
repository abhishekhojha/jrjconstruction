'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import QuotationDocument, { QuotationData } from './QuotationDocument';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export default function PDFDownloadButton({ data, fileName }: { data: QuotationData, fileName: string }) {
    return (
        <PDFDownloadLink
            document={<QuotationDocument data={data} />}
            fileName={fileName}
        >
            {/* @ts-ignore - render prop types can be tricky */}
            {({ blob, url, loading, error }: any) => (
                <Button 
                    className="w-full h-14 rounded-2xl bg-[#163587] hover:bg-[#163587]/90 text-white hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-primary/20 font-black text-base border-none" 
                    disabled={loading}
                >
                    <FileDown className="h-5 w-5 mr-3" />
                    {loading ? 'Preparing Document...' : 'Download PDF Proposal'}
                </Button>
            )}
        </PDFDownloadLink>
    );
}
