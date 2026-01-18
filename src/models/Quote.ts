import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuote extends Document {
    quoteDetails: {
        quoteNumber: string;
        issueDate: string;
        expiryDate: string;
        bidNumber: string;
    };
    clientDetails: {
        name: string;
        addressLine1: string;
        phone: string;
    };
    companyDetails: {
        name: string;
        address: string;
        email: string;
        phone: string;
    };
    columnHeaders: {
        room: string;
        description: string;
        amount: string;
    };
    items: Array<{
        category: string;
        description: string;
        amount: number | null;
    }>;
    taxDetails?: {
        enabled: boolean;
        type: 'percentage' | 'fixed';
        value: number;
        description: string;
        displayAsSeparateRow: boolean;
    };
    totalDetails: {
        label: string;
        totalAmount: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const QuoteSchema: Schema = new Schema({
    quoteDetails: {
        quoteNumber: { type: String, required: true },
        issueDate: { type: String, required: true },
        expiryDate: { type: String, required: true },
        bidNumber: { type: String, required: true },
    },
    clientDetails: {
        name: { type: String, required: true },
        addressLine1: { type: String, required: true },
        phone: { type: String, required: true },
    },
    companyDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    columnHeaders: {
        room: { type: String, default: "ROOM" },
        description: { type: String, default: "DESCRIPTION" },
        amount: { type: String, default: "AMOUNT" },
    },
    items: [{
        category: { type: String, required: true },
        description: { type: String, default: "" },
        amount: { type: Number, default: null },
    }],
    taxDetails: {
        enabled: { type: Boolean, default: false },
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
        value: { type: Number, default: 0 },
        description: { type: String, default: 'Tax' },
        displayAsSeparateRow: { type: Boolean, default: false },
    },
    totalDetails: {
        label: { type: String, required: true },
        totalAmount: { type: Number, required: true },
    },
}, {
    timestamps: true,
});

// Prevent overwrite if model already exists
const Quote: Model<IQuote> = mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);

export default Quote;
