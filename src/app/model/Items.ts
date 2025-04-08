export interface Item {
    id: string;
    itemName: string;
    barcode: string;
  }
  
  export interface ItemResponse {
    items: Item[];
  }