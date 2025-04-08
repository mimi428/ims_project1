import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ItemsService } from '../../service/items.service';
import { ItemResponse } from '../../model/Items';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  billingForm: FormGroup;
  showItemPopup = false;
  showBatchPopup = false;
  selectedRow: number = 0;
  allFields: any;
  @ViewChild('addRowButton') addRowButton!: ElementRef;

  // Item and batch data
  items: any[] = []; // Data fetched through itemsservice

  batches = [
    { id: '1', batchNo: 'B00001', expiryDate: '2025-12-31' },
    { id: '2', batchNo: 'B00002', expiryDate: '2026-11-30' },
    { id: '3', batchNo: 'B00003', expiryDate: '2026-03-10' },
  ];

  constructor(private fb: FormBuilder, private itemsService: ItemsService, private http: HttpClient) {
    this.billingForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.addRow(); // Add first row automatically
  }
  ngOnInit() {
    // Fetch items from the db
    this.itemsService.getItems().subscribe(
      (data) => {
        this.items = data; // Assign fetched data to item
        console.log('Items loaded:', this.items);
      }
    );
  }
  get rows(): FormArray {
    return this.billingForm.get('rows') as FormArray;
  }

  createRow(): FormGroup {
    return this.fb.group({
      barcode: [''],
      itemName: ['',Validators.required],
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

  addRow() { // adds a new row if previous one is valid
    if (this.rows.length === 0 || this.isLastRowValid()) {
      const newRow = this.createRow();
      this.rows.push(newRow);
      this.detectAllFields();
      this.selectedRow = this.rows.length - 1;

      setTimeout(() => {
        const newRowIndex = this.rows.length - 1;
        const firstInput = document.querySelector(`
          [formGroupName="${newRowIndex}"] input:not([readonly]), 
          [formGroupName="${newRowIndex}"] select
        `) as HTMLElement;

        if (firstInput) {
          firstInput.focus();
        }
      }, 0);
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
  itemSignals: { [key: number]: any } = {}; // object haru jasma row ko index anusar signal save garincha.
  batchSignals: { [key: number]: any } = {};

  // Fixing the selectItem method to correctly set the itemName and barcode
  selectItem(item: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;

    // Directly update the form control value
    row.patchValue({
      itemName: item.itemName,
      barcode: item.barcode,
    });

    // Update itemSignals for placeholder binding 
    this.itemSignals[this.selectedRow] = item.itemName;

    console.log('Item Selected:', item);
    this.closeItemPopup();
  }
 
  selectBatch(batch: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
  
    // Use patchValue to update batch and expiryDate in the form row
    row.patchValue({
      batch: batch.batchNo,
      expiryDate: batch.expiryDate
    });
  
    console.log('Batch Selected:', batch);
    this.closeBatchPopup();
  }
  
  onSubmit() {
    if (this.billingForm.valid) {
      const rows = this.billingForm.value.rows; // Assuming rows is a FormArray
  
      rows.forEach((rowData: any) => {
        this.http.post('http://localhost:3002/billingData', rowData).subscribe(
          (response) => {
            console.log('Row saved successfully:', response);
          },
          (error) => {
            console.error('Error saving row:', error);
          }
        );
      });
  
      alert('All rows submitted!');
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

    if (activeElement?.getAttribute('formControlName') === 'itemName') {
      event.preventDefault();
      this.openItemPopup();
      return;
    }

    if (activeElement?.getAttribute('formControlName') === 'batch') {
      event.preventDefault();
      this.openBatchPopup();
      return;
    }

    if (activeElement && activeElement.tagName === 'INPUT' && activeElement.closest('table')) {
      event.preventDefault();
      this.moveToNextField(activeElement);
    }
  }

  detectAllFields() {
    this.allFields = Array.from(
      document.querySelectorAll('input[formControlName], select[formControlName]')
    ) as HTMLElement[];
  }

  private moveToNextField(currentElement: HTMLElement) {
    this.detectAllFields();

    const currentIndex = this.allFields.indexOf(currentElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.allFields.length - 1) {
      this.addRow();
    }
    while (nextIndex < this.allFields.length) {
      const nextField = this.allFields[nextIndex];
      if (this.isFieldFocusable(nextField)) {
        nextField.focus();
        break;
      }
      nextIndex++;
    }
  }

  private isFieldFocusable(field: HTMLElement): boolean {
    if (field.hasAttribute('readonly')) {
      return field.getAttribute('formControlName') === 'itemName' || field.getAttribute('formControlName') === 'batch';
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
    const activeElement = document.activeElement as HTMLElement;
    if (!activeElement) return;
    if (!activeElement.matches('input, select') || !activeElement.closest('table')) {
      return;
    }
    const allFields = Array.from(
      document.querySelectorAll('input[formControlName], select[formControlName]')
    ) as HTMLElement[];

    const currentIndex = allFields.indexOf(activeElement);
    if (currentIndex === -1) return;

    const direction = event.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < allFields.length) {
      allFields[nextIndex].focus();
    }
  }
}
