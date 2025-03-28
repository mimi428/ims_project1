import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('addRowButton') addRowButton!: ElementRef;

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
      expiryDate: [''], 
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
    // Check if this is the first row or if all required fields in the last row are filled
    if (this.rows.length === 0 || this.isLastRowValid()) {
      const newRow = this.createRow();
      this.rows.push(newRow);
      // Focus on the first field of the new row
      setTimeout(() => {
        const newRowIndex = this.rows.length - 1;
        const firstInput = document.querySelector(`[formGroupName="${newRowIndex}"] input`) as HTMLElement;
        if (firstInput) {
          firstInput.focus();
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markLastRowAsTouched();
      alert('Please fill all required fields in the current row before adding a new one');
    }
  }

  isLastRowValid(): boolean {
    const lastRow = this.rows.at(this.rows.length - 1) as FormGroup;
    return lastRow.valid;
  }

  markLastRowAsTouched() {
    const lastRow = this.rows.at(this.rows.length - 1) as FormGroup;
    Object.keys(lastRow.controls).forEach(key => {
      lastRow.get(key)?.markAsTouched();
    });
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
//desc lekhda automatically barcode ko value basna janakolagi ho 
  selectItem(item: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      itemDesc: item.name,
      barcode: item.barcode
    });
    this.showItemPopup = false;
    // After selecting item, focus on the next field
    setTimeout(() => {
      const nextInput = document.querySelector(`[formGroupName="${this.selectedRow}"] [formControlName="batch"]`) as HTMLElement;
      if (nextInput) {
        nextInput.focus();
      }
    });
  }

  selectBatch(batch: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      batch: batch.batchNo,
      expiryDate: batch.expiryDate
    });
    this.showBatchPopup = false;
    // After selecting batch, focus on the next field
    setTimeout(() => {
      const nextInput = document.querySelector(`[formGroupName="${this.selectedRow}"] [formControlName="unit"]`) as HTMLElement;
      if (nextInput) {
        nextInput.focus();
      }
    });
  }

  closeItemPopup() {
    this.showItemPopup = false;
  }

  closeBatchPopup() {
    this.showBatchPopup = false;
  }

  activeIndex(i: number) {
    this.selectedRow = i;
  }

  onSubmit() {
    if (this.billingForm.valid) {
      console.log('Form submitted:', this.billingForm.value);
    } else {
      this.markAllRowsAsTouched();
      alert('Please fill all required fields');
    }
  }

  markAllRowsAsTouched() {
    this.rows.controls.forEach(row => {
      (row as FormGroup).markAllAsTouched();
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;
    
    // Check if we're in an input field in our table
    if (activeElement && activeElement.tagName === 'INPUT' && 
        activeElement.closest('table')) {
      // Prevent default form submission behavior
      event.preventDefault();
      
      // Don't do anything if we're in a popup
      if (this.showItemPopup || this.showBatchPopup) return;
      
      // Don't do anything if we're in the delete button
      if (activeElement.classList.contains('closetools')) return;
      
      // Programmatically click the add row button
      this.addRowButton.nativeElement.click();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.handleArrow(event);
    }
  }

  private handleArrow(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;//esle aaile focus vairako element dinxa.
    if (!activeElement) return;
   // handle elements in our table
    if (!activeElement.matches('input, select') || !activeElement.closest('table')) { //this ensures that the elements are of table onlyyy
      return;
    }
    const allFields = Array.from( //fetch all fields from Table
      document.querySelectorAll('input[formControlName], select[formControlName]')
    ) as HTMLElement[];
    
    const currentIndex = allFields.indexOf(activeElement);// find inex of active element
    if (currentIndex === -1) return;

    const direction = event.key === 'ArrowLeft' ? -1 : 1;
     // if rightt is pressed  direction is 1 which moves right
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < allFields.length) {
      allFields[nextIndex].focus();
    }
  }
}