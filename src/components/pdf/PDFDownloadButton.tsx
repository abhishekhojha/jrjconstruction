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
                <Button className="w-full gap-2" disabled={loading} size="lg">
                    <FileDown className="h-4 w-4" />
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
            )}
        </PDFDownloadLink>
    );
}
