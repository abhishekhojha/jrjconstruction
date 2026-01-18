import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Quote from '@/models/Quote';

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        // Basic validation could go here

        const newQuote = await Quote.create(data);
        return NextResponse.json({ success: true, quote: newQuote }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating quote:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '9');
        const skip = (page - 1) * limit;

        const total = await Quote.countDocuments();
        const quotes = await Quote.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

        return NextResponse.json({
            success: true,
            quotes,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
