
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      fromAd1: [''],
      fromAd2: [''],
      toAd1: [''],
      toAd2: [''],
      division: ['DEMOCN_AUTO'],
      costCenter: [''],
      reportType: ['itemGroup'],
      groupOption: ['hierarchy'],
      showVariantFilters: [false],
      showItemDetails: [false],
      department: [''],
      mainItem: [''],
      purchaseType: ['ALL'],
      invoiceType: ['ALL'],
      supplierName: [''],
      itemName: [''],
      multipleItems: [false],
      batchWiseReport: [false]
    });
  }

  runReport() {
    console.log(this.reportForm.value);
  }

  close() {
    // Close logic here
  }
}
