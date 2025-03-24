import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingComponent } from "../billing/billing.component";

@Component({
  selector: 'app-tax-invoice',
  imports: [CommonModule, BillingComponent],
  templateUrl: './tax-invoice.component.html',
  styleUrl: './tax-invoice.component.css'
})
export class TaxInvoiceComponent {
  invoiceForm: FormGroup;
  costCenters = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Operations' },
    { id: 3, name: 'IT' },
  ];
  showDetails = false;
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault(); 
      this.toggleDetails();
    }
  }
  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      invDate: [{ value: '', disabled: true }],
      entryDate: [{ value: '', disabled: true }],
      soNo: [{ value: '', disabled: true }],
      loadFullSODetail: [false],
      warehouse: [{ value: '', disabled: true }],
      salesman: [''],
      costCenter: [''],
      customer: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      vatNo: [{ value: '', disabled: true }],
      remarks: [''],
      flatDisPercent: [{ value: '', disabled: true }],
      flatDisRs: [{ value: '', disabled: true }],
    });
  }
  showSalesmanPopup: boolean = false;
  salesmen = [
    { name: 'Amrita', contactInfo: '878878787' },
    { name: 'Sita', contactInfo: '41845' },
    { name: 'Gita', contactInfo: '432845' },
    { name: 'Nita', contactInfo: '438345' },
    { name: 'Rita', contactInfo: '438445' },
    { name: 'Anita', contactInfo: '438455' },
    { name: 'Mihika', contactInfo: '243543' }
  ];
  openSalesmanPopup(): void {
    this.showSalesmanPopup = true;
  }
  closeSalesmanPopup(): void {
    this.showSalesmanPopup = false;
  }
  selectedSalesman(salesman: any) {
    this.selectedSalesman = salesman.name; // Update the selected salesman name
    this.invoiceForm.get('salesman')?.setValue(salesman.name); // Update the form control value (optional)
    this.closeSalesmanPopup(); // Close the popup
  }
}



