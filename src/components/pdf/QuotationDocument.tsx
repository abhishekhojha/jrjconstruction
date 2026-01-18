import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts if needed, otherwise use default Helvetica/Times
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf' });

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        paddingBottom: 40, // Space for footer if needed
    },
    fullImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    // JRJ Specific Styles
    pageContent: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#000',
    },
    // Header Grid
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    headerLeft: {
        width: '45%',
    },
    headerRight: {
        width: '45%',
        alignItems: 'flex-end', // Align right column content to right? Or just text? Let's check visual. "Contains JRJ Contractors..." usually left aligned within right column or right aligned. The user said "Right Column: Contains...", usually text is aligned left relative to column, but column is on right. Let's stick to standard flow.
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold', // 'bold' is correct for Helvetica standard
        marginBottom: 5,
    },
    headerLabel: {
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000',
        marginTop: 8,
        marginBottom: 2,
    },
    headerText: {
        fontSize: 10,
        marginBottom: 1,
    },
    headerTextBold: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 1,
    },

    // Table
    tableContainer: {
        marginTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 8,
        minHeight: 30, // Ensure decent height
    },
    // Columns
    colRoom: {
        width: '15%',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingRight: 5,
    },
    colDesc: {
        width: '65%',
        textAlign: 'left',
        paddingHorizontal: 5,
    },
    colAmount: {
        width: '20%',
        textAlign: 'right',
        paddingLeft: 5,
    },
    // Text modifications
    rowTextBold: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 9, // Slightly smaller as requested
        lineHeight: 1.4,
    },

    // Footer
    footerContainer: {
        marginTop: 15,
        flexDirection: 'column', // Changed to column to stack rows
        alignItems: 'flex-end',
        width: '100%',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 2,
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 10,
        fontWeight: 'normal',
        marginRight: 20,
        width: 150, // Fixed width for alignment
        textAlign: 'right',
    },
    footerLabelBold: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 20,
        width: 150,
        textAlign: 'right',
    },
    footerValue: {
        fontSize: 10,
        width: 100,
        textAlign: 'right',
    },
    footerAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 100,
        textAlign: 'right',
    },
});

export interface QuoteDetails {
    quoteNumber: string;
    issueDate: string;
    expiryDate: string;
    bidNumber: string;
}

export interface ClientDetails {
    name: string;
    addressLine1: string;
    phone: string;
}

export interface CompanyDetails {
    name: string;
    address: string;
    email: string;
    phone: string;
}

export interface Item {
    category: string;
    description: string;
    amount: number | null;
}

export interface TotalDetails {
    label: string;
    totalAmount: number;
}

export interface TaxDetails {
    enabled: boolean;
    type: 'percentage' | 'fixed'; // percentage or fixed amount
    value: number; // e.g. 10 for 10% or 100 for $100
    description: string; // e.g. "GST" or "Tax"
    displayAsSeparateRow: boolean; // if true, show separate row. if false, add to total implicitly.
}

export interface ColumnHeaders {
    room: string;
    description: string;
    amount: string;
}

export interface QuotationData {
    quoteDetails: QuoteDetails;
    clientDetails: ClientDetails;
    companyDetails: CompanyDetails;
    columnHeaders: ColumnHeaders; // New field
    items: Item[];
    totalDetails: TotalDetails;
    taxDetails?: TaxDetails;
}

// Helper to calculate total
const calculateTotals = (items: Item[], tax?: TaxDetails) => {
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    let taxAmount = 0;

    if (tax && tax.enabled) {
        if (tax.type === 'percentage') {
            taxAmount = subtotal * (tax.value / 100);
        } else {
            taxAmount = tax.value;
        }
    }

    return { subtotal, taxAmount, grandTotal: subtotal + taxAmount };
};

const QuotationDocument = ({ data }: { data: QuotationData }) => {
    const { subtotal, taxAmount, grandTotal } = calculateTotals(data.items, data.taxDetails);

    return (
        <Document>
            {/* Page 1 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/1.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 2 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/2.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 3 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/3.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 4 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/4.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 5 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/5.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 6 - Dynamic JRJ Layout */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageContent}>

                    {/* Header Grid */}
                    <View style={styles.headerContainer}>
                        {/* Left Column */}
                        <View style={styles.headerLeft}>
                            <Text style={styles.headerTitle}>QUOTE</Text>

                            <Text style={styles.headerLabel}>QUOTE #</Text>
                            <Text style={styles.headerTextBold}>{data.quoteDetails.quoteNumber}</Text>

                            <Text style={styles.headerLabel}>ISSUED TO</Text>
                            <Text style={styles.headerText}>{data.clientDetails.name}</Text>
                            <Text style={styles.headerText}>{data.clientDetails.addressLine1}</Text>
                            <Text style={styles.headerText}>{data.clientDetails.phone}</Text>

                            <Text style={styles.headerLabel}>ISSUE DATE</Text>
                            <Text style={styles.headerTextBold}>{data.quoteDetails.issueDate}</Text>
                        </View>

                        {/* Right Column */}
                        <View style={styles.headerRight}>
                            {/* Company Name usually aligns with "QUOTE" roughly */}
                            <Text style={[styles.headerTitle, { fontSize: 20 }]}>{data.companyDetails.name}</Text>

                            <Text style={styles.headerLabel}>BID NO</Text>
                            <Text style={styles.headerTextBold}>{data.quoteDetails.bidNumber}</Text>

                            <Text style={styles.headerLabel}>COMPANY ADDRESS</Text>
                            <Text style={styles.headerText}>{data.companyDetails.address}</Text>
                            <Text style={styles.headerText}>{data.companyDetails.email}</Text>
                            <Text style={styles.headerText}>{data.companyDetails.phone}</Text>

                            <Text style={styles.headerLabel}>EXPIRY DATE</Text>
                            <Text style={styles.headerTextBold}>{data.quoteDetails.expiryDate}</Text>
                        </View>
                    </View>

                    {/* Table */}
                    <View style={styles.tableContainer}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.colRoom}>{data.columnHeaders.room}</Text>
                            <Text style={[styles.colDesc, { fontWeight: 'bold' }]}>{data.columnHeaders.description}</Text>
                            <Text style={[styles.colAmount, { fontWeight: 'bold' }]}>{data.columnHeaders.amount}</Text>
                        </View>

                        {/* Rows */}
                        {data.items.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                {/* Vertical Alignment: Text in "Room" is vertically centered. Flexbox 'center' does this. */}
                                <View style={[styles.colRoom, { justifyContent: 'center' }]}>
                                    <Text style={styles.rowTextBold}>{item.category}</Text>
                                </View>

                                <View style={styles.colDesc}>
                                    <Text style={styles.rowText}>{item.description}</Text>
                                </View>

                                <View style={styles.colAmount}>
                                    <Text style={styles.rowTextBold}>
                                        {item.amount !== null ? `$ ${item.amount.toFixed(2)}` : ''}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        {/* If separate row tax is enabled, show Subtotal first */}
                        {data.taxDetails?.enabled && data.taxDetails.displayAsSeparateRow && (
                            <>
                                <View style={styles.footerRow}>
                                    <Text style={styles.footerLabel}>Subtotal:</Text>
                                    <Text style={styles.footerValue}>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                </View>
                                <View style={styles.footerRow}>
                                    <Text style={styles.footerLabel}>{data.taxDetails.description}:</Text>
                                    <Text style={styles.footerValue}>${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                </View>
                            </>
                        )}

                        {/* Grand Total */}
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabelBold}>{data.totalDetails.label}</Text>
                            <Text style={styles.footerAmount}>
                                $ {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                        </View>
                    </View>

                </View>
            </Page>

            {/* Page 7 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/7.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 8 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/8.jpg" style={styles.fullImage} />
            </Page>

            {/* Page 9 - Static */}
            <Page size="A4" style={styles.page}>
                <Image src="/pdf_temp/9.jpg" style={styles.fullImage} />
            </Page>
        </Document>
    );
}; // Close component block properly
export default QuotationDocument;
