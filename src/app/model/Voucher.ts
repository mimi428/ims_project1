export interface VoucherRow {
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
  
  export interface Voucher {
    id?: number;
    date: string;
    rows: VoucherRow[];
  }