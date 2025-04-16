import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ItemsService } from '../../service/items.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VoucherService } from '../../service/voucher.service';
import { Voucher, VoucherRow } from '../../model/Voucher';

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  voucherForm: FormGroup;
  showItemPopup = false;
  showBatchPopup = false;
  selectedRow: number = 0;
  voucherData: any = {};
  selectedVoucher: any = null;
  voucherId: string = '';
  allFields: any;
  @ViewChild('addRowButton') addRowButton!: ElementRef;
  items: any[] = []; // data from itemsservice

  batches = [
    { id: '1', batchNo: 'B00001', expiryDate: '2025-12-31' },
    { id: '2', batchNo: 'B00002', expiryDate: '2026-11-30' },
    { id: '3', batchNo: 'B00003', expiryDate: '2026-03-10' },
  ];

  constructor(private fb: FormBuilder, private itemsService: ItemsService, private http: HttpClient, private route: ActivatedRoute, public voucherService: VoucherService) {
    this.voucherForm = this.fb.group({
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
    // Retrieve the query parameters and assign them to billData
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.populateForm(params);
      }
    });
    this.generateVoucherId();  // Generate voucher ID when the component is loaded
  }

  // Method to generate a unique Voucher ID
  generateVoucherId() {
    const timestamp = new Date().getTime();  //generate a Voucher ID based on timestamp
    this.voucherId = `V${timestamp}`;
  
  }
  get rows(): FormArray {
    return this.voucherForm.get('rows') as FormArray;
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
  calculateAmount(index: number) {
    const row = this.rows.at(index) as FormGroup;
    const quantity = Number(row.get('quantity')?.value) || 0;
    const rate = Number(row.get('rate')?.value) || 0;
    const totalDisc = Number(row.get('totalDisc')?.value) || 0;
    const vat = Number(row.get('vat')?.value) || 0;
    const amt = quantity * rate;
    const netAmount = amt - totalDisc + vat;
  
    row.patchValue({
      amt: amt,
      netAmount: netAmount
    }, { emitEvent: false }); // Avoid triggering infinite loop if you're subscribing
  }
  showVouchersPopup = false; // Already declared

toggleVouchersPopup() {
  this.showVouchersPopup = !this.showVouchersPopup;
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
  closeVoucherPopup(){
    this.showVouchersPopup= false;
  }
  activeIndex(i: number) {
    this.selectedRow = i;
  }
  itemSignals: { [key: number]: any } = {}; // object haru jasma row ko index anusar signal save garincha.
  batchSignals: { [key: number]: any } = {};
  unitSignals: {[key:number]:any}={};
  selectItem(item: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      itemName: item.itemName,
      barcode: item.barcode,
      unit: '',
    });
    this.itemSignals[this.selectedRow] = item.itemName;
    const unitOptions = [
      { label: item.unitName, value: item.unitName },
      { label: item.alternateUnit, value: item.alternateUnit }
    ];
    this.unitSignals[this.selectedRow] = unitOptions;

    console.log('Item Selected:', item);
    console.log('Unit Options:', unitOptions);
    this.closeItemPopup();
  }
 
  selectBatch(batch: any) {
    const row = this.rows.at(this.selectedRow) as FormGroup;
    row.patchValue({
      batch: batch.batchNo,
      expiryDate: batch.expiryDate
    });
  
    console.log('Batch Selected:', batch);
    this.closeBatchPopup();
  }
  populateForm(billData: any): void {
    console.log('Populating Form with:', billData);
    const row = this.fb.group({
      barcode: [billData.barcode],
      itemName: [billData.itemName, Validators.required],
      batch: [billData.batch, Validators.required],
      unit: [billData.unit],
      quantity: [billData.quantity, [Validators.required, Validators.min(1)]],
      rate: [billData.rate, [Validators.required, Validators.min(0)]],
      amt: [billData.amt, Validators.required],
      totalDisc: [billData.totalDisc],
      vat: [billData.vat],
      netAmount: [billData.netAmount, Validators.required],
      expiryDate: [billData.expiryDate],
    });

    this.rows.clear();
    this.rows.push(row);
  }
  loadVoucherDetails(voucherId: string) {
    this.http.get<any>(`http://localhost:3004/vouchers/${voucherId}`).subscribe(
      (voucherData) => {
        this.voucherId = voucherData.id;
        this.voucherForm.reset();
        this.rows.clear(); // voucher ma vako matra dekhaune ho so remove existing rows
  
        voucherData.rows.forEach((row: any) => {
          const rowForm = this.fb.group({
            barcode: [row.barcode],
            itemName: [row.itemName, Validators.required],
            batch: [row.batch, Validators.required],
            unit: [row.unit, Validators.required],
            quantity: [row.quantity, [Validators.required, Validators.min(1)]],
            rate: [row.rate, [Validators.required, Validators.min(0)]],
            amt: [row.amt, Validators.required],
            totalDisc: [row.totalDisc],
            vat: [row.vat],
            netAmount: [row.netAmount, Validators.required],
            expiryDate: [row.expiryDate],
          });
  
          this.rows.push(rowForm);
        });
  
        this.closeVoucherPopup();
      },
      (error) => {
        alert('Failed to load voucher details.');
      }
    );
  }
  
  onSubmit() {
    if (this.voucherForm.valid) {
      // Get all the rows from the form (the rows FormArray)
      const rows = this.voucherForm.get('rows')?.value;
      const voucher = {
        id: this.voucherId, // Unique ID based on timestamp
        date: new Date().toISOString().split('T')[0], // idk this ask ai 
        rows: rows
      };
  
      // Send the entire voucher to the backend in one request
      this.http.post('http://localhost:3004/vouchers', voucher).subscribe(
        (response) => {

          alert('Voucher saved successfully!');
          this.voucherForm.reset();
          this.rows.clear();
          this.addRow(); // Add a new empty row if needed
        },
        (error) => {
          console.error('Error saving voucher:', error);
          alert('There was an error saving the voucher. Please try again.');
        }
      );
    } else {
      this.markAllRowsAsTouched(); // Ensure that all form fields are marked as touched for validation
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
