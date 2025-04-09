import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Bill } from '../../model/View';
import { ViewService } from '../../service/view.service';
import { BillingStateService } from '../../service/billing-state.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  billData: Bill[] = []; // Array to hold the fetched data

  constructor(
    private viewService: ViewService,
    private billingState: BillingStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewService.getbillingData().subscribe(
      (data) => {
        this.billData = data; // Assign fetched data to item
        console.log('Bill loaded:', this.billData);
      },
      (error) => {
        console.error('Error fetching billing data:', error);
      }
    );
  }

  editBill(bill: any): void {
    const queryParams = {
      barcode: bill.barcode,
      itemName: bill.itemName,
      batch: bill.batch,
      unit: bill.unit,
      quantity: bill.quantity,
      rate: bill.rate,
      amt: bill.amt,
      totalDisc: bill.totalDisc,
      vat: bill.vat,
      netAmount: bill.netAmount,
      expiryDate: bill.expiryDate,
    };
    // Navigate to the billing page with the selected bill's data
    this.router.navigate(['/billing'], { queryParams});
  }
  deleteBill(bill: any): void {
    if (confirm('Are you sure you want to delete this bill?')) {
      // Remove the bill from the local array to update the UI
      this.billData = this.billData.filter((b) => b.id !== bill.id);
  
      // Send a DELETE request to the server
      this.viewService.deleteBill(bill.id).subscribe(
        () => {
          console.log('Bill deleted successfully:', bill);
        },
        (error) => {
          console.error('Error deleting bill:', error);
          alert('Failed to delete the bill. Please try again.');
        }
      );
    }
  }
}
