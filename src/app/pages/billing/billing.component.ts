import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  billingForm: FormGroup;
  showItemPopup = false;
  showBatchPopup = false;
  selectedRow: number = 0;

  items = [
    { name: 'Bottle', barcode: '123456' },
    { name: 'Shoes', barcode: '789012' },
    { name: 'Fruit', barcode: '562341' }
  ];

  batches = [
    { batchNo: 'B00001', expiryDate: '2025-12-31' },
    { batchNo: 'B00002', expiryDate: '2026-11-30' },
    { batchNo: 'B00003', expiryDate: '2026-03-10' },
  ];

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.addRow(); 
  }

  get rows(): FormArray {
    return this.billingForm.get('rows') as FormArray;
  }

  createRow(): FormGroup {
    return this.fb.group({
      barcode: [''], 
      itemDesc: ['', Validators.required],
      batch: ['', Validators.required],
      expiryDate: ['' ], 
      unit: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      rate: [null, [Validators.required, Validators.min(0)]],
      amt: [null, Validators.required],
      totalDisc: [null],
      vat: [null],
      netAmount: [null, Validators.required]
    });
  }

  addRow() {
    if (this.rows.valid) {
      this.rows.push(this.createRow());
    } else {
      alert('Please fill all fields');
    }
  }

  deleteRow(index: number) {
    this.rows.removeAt(index);
  }

  openItemPopup() {
    this.showItemPopup = true;
  }

  openBatchPopup() {
    this.showBatchPopup = true;
  }

  selectItem(item: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      itemDesc: item.name,
      barcode: item.barcode
    });
    this.showItemPopup = false;
  }

  selectBatch(batch: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      batch: batch.batchNo,
      expiryDate: batch.expiryDate
    });
    this.showBatchPopup = false;
  }

  closeItemPopup() {
    this.showItemPopup = false;
  }

  closeBatchPopup() {
    this.showBatchPopup = false;
  }
  activeIndex(i:number){
    this.selectedRow = i;
  }

  onSubmit() {
    if (this.billingForm.valid) {
      console.log('Form submitted:', this.billingForm.value);
    } else {
      alert('Please fill all fields');
    }
  }
}