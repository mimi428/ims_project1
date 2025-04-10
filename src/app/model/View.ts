export interface Bill {
    id:any;
    barcode: string;
    itemName: string;
    batch: string;
    unit: string;
    quantity: number;
    rate: number;
    amt: number;
    totalDisc: number;
    vat: number;
    netAmount: number;
    expiryDate: string;
}