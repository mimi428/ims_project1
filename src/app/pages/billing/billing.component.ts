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
    { id:'1', name: 'Bottle', barcode: '123456' },
    {  id:'2',name: 'Shoes', barcode: '789012' },
    { id:'3', name: 'Bag', barcode: '784012' },
    { id:'4', name: 'Pen', barcode: '889012' },
    {  id:'5',name: 'Fruit', barcode: '562341' }
  ];

  batches = [
    { id:'1', batchNo: 'B00001', expiryDate: '2025-12-31' },
    { id:'2', batchNo: 'B00002', expiryDate: '2026-11-30' },
    { id:'3',batchNo: 'B00003', expiryDate: '2026-03-10' },
  ];

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.addRow(); // Add first row automatically
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
    if (this.rows.length === 0 || this.isLastRowValid()) {
      const newRow = this.createRow();
      this.rows.push(newRow);
      this.selectedRow = this.rows.length -1;
      
      // Focus on the first field of the new row on enter
      setTimeout(() => {
        const newRowIndex = this.rows.length - 1;
        const firstInput = document.querySelector(`
          [formGroupName="${newRowIndex}"] input:not([readonly]), 
          [formGroupName="${newRowIndex}"] select
        `) as HTMLElement;
        
        if (firstInput) {
          firstInput.focus();
        }
      },0);
    } else {
      this.markLastRowAsTouched();
      alert('Please fill all fields');
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
  closeItemPopup() {
    this.showItemPopup = false;
  }
  closeBatchPopup() {
    this.showBatchPopup = false;
  }
  activeIndex(i: number) {
    this.selectedRow = i;
  }

//desc lekhda automatically barcode ko value basna janakolagi ho 
  selectItem(item: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      itemDesc: item.name,
      barcode: item.barcode
    });
    this.closeItemPopup();
  }

  selectBatch(batch: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      batch: batch.batchNo,
      expiryDate: batch.expiryDate
    });
    this.closeBatchPopup();
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
  //popup close garnalai
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (this.showBatchPopup) {
      this.closeBatchPopup();
    } else if (this.showItemPopup) {
      this.closeItemPopup();
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;
    // enter garda popup kholnu paryoo instead of moving to next field
    if (activeElement?.getAttribute('formControlName') === 'itemDesc') {
      event.preventDefault();
      this.openItemPopup();
      return;
    }
    
    if (activeElement?.getAttribute('formControlName') === 'batch') {
      event.preventDefault();
      this.openBatchPopup();
      return;
    }

    // Default field navigation
    if (activeElement && activeElement.tagName === 'INPUT' && activeElement.closest('table')) {
      event.preventDefault();
      this.moveToNextField(activeElement);
    }
  }
// to the next field when the enter pressed.
  private moveToNextField(currentElement: HTMLElement) {
    const allFields = Array.from(
      document.querySelectorAll('input[formControlName], select[formControlName]')
    ) as HTMLElement[];

    const currentIndex = allFields.indexOf(currentElement);
    if (currentIndex === -1) return;

    // Find next focusable field
    let nextIndex = currentIndex + 1;
    while (nextIndex < allFields.length) {
      const nextField = allFields[nextIndex];
      if (this.isFieldFocusable(nextField)) {
        nextField.focus();
        break;
      }
      nextIndex++;
    }

    // If reached the end, add new row
    if (nextIndex >= allFields.length) {
      this.addRowButton.nativeElement.click();
    }
  }

  private isFieldFocusable(field: HTMLElement): boolean {
    // Skip readonly fields except for the itemDesc and batch fields cause it opens popups
    if (field.hasAttribute('readonly')) {
      return field.getAttribute('formControlName') === 'itemDesc' || field.getAttribute('formControlName') === 'batch';
    }
    return true;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.handleArrowKeys(event);
    }
  }
  private handleArrowKeys(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;//esle aaile focus vairako element dinxa.
    if (!activeElement) return;
    // handle elements in table
    if (!activeElement.matches('input, select') || !activeElement.closest('table')) { //this ensures that the elements are of table onlyyy
      return;
    }
    const allFields = Array.from( //fetch all fields from Table
      document.querySelectorAll('input[formControlName], select[formControlName]')
    ) as HTMLElement[];
    
    const currentIndex = allFields.indexOf(activeElement);// find inex of active element
    if (currentIndex === -1) return;

    const direction = event.key === 'ArrowLeft' ? -1 : 1;
     // if rightt is pressed  direction is 1 which moves right or viceversaa
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < allFields.length) {
      allFields[nextIndex].focus();
    }
  }
}