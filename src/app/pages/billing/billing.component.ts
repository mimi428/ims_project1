import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  
  selectInput(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  closePopup(): void {
    console.log("Popup closed");
  }
}
