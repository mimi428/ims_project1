export interface Item {
    id: string;
    itemName: string;
    barcode: string;
    unitName: string;
    conFactor:number;
    alternateUnit:string;
  }
  
  export interface ItemResponse {
    items: Item[];
  }