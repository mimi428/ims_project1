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
  
  selectInput(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  closePopup(): void {
    console.log("Popup closed");
  }
  addRow() {
    this.rows.push({});
  }
  deleteRow(){
    this.rows.pop();
  }
}
