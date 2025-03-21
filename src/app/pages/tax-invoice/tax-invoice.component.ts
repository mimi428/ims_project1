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
      salesman: [{ value: '', disabled: true }],
      costCenter: [''],
      customer: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      vatNo: [{ value: '', disabled: true }],
      remarks: [''],
      flatDisPercent: [{ value: '', disabled: true }],
      flatDisRs: [{ value: '', disabled: true }],
    });
  }
}


