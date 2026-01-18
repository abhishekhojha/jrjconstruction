import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Quote from '@/models/Quote';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedQuote = await Quote.findByIdAndDelete(id);

        if (!deletedQuote) {
            return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Quote deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting quote:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
