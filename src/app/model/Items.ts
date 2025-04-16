export interface Item {
    id: string;
    itemName: string;
    barcode: string;
    unitName: string;
  }
  
  export interface ItemResponse {
    items: Item[];
  }