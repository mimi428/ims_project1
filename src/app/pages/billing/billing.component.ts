import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  imports:[CommonModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  rows: any[] = [];
  showItemPopup = false;
  showBatchPopup = false;
  selectedRow: number = 0;

  items = [
    { name: 'Bottle', barcode: '123456' },
    { name: 'Shoes', barcode: '789012' },
    { name: 'Fruit', barcode:'562341'}
  ];

  batches = [
    { batchNo: 'B00001', expiryDate: '2025-12-31' },
    { batchNo: 'B00002', expiryDate: '2026-11-30' },
    { batchNo: 'B00003', expiryDate: '2026-03-10' },
    { batchNo: 'B00004', expiryDate: '2026-04-12' },
    { batchNo: 'B00005', expiryDate: '2026-05-29' },
    { batchNo: 'B00006', expiryDate: '2026-02-21' },
  ];

  addRow() {
    this.rows.push({ barcode:'',itemDesc: '', batch: '' , expdate:''});
  }
  deleteRow(){
    this.rows.pop();
  }
  openItemPopup() {
    this.showItemPopup = true;
  }
  openBatchPopup() {
    this.showBatchPopup = true;
  }
  selectItem(item: any) {
    this.rows[this.selectedRow].itemDesc = item.name;
    this.rows[this.selectedRow].barcode = item.barcode;
    this.showItemPopup = false;
  }
  selectBatch(batch: any) {
    this.rows[this.selectedRow].batch = batch.batchNo;
    this.rows[this.selectedRow].expiryDate= batch.expiryDate;
    this.showBatchPopup = false;
  }
  closeItemPopup() {
    this.showItemPopup = false;
  }
  closeBatchPopup() {
    this.showBatchPopup = false;
  }
}

