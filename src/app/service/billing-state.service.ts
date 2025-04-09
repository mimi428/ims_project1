import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../model/View';

@Injectable({
  providedIn: 'root'
})
export class BillingStateService {
  private billToEdit = new BehaviorSubject<Bill | null>(null);
  billToEdit$ = this.billToEdit.asObservable();

  setBill(bill: Bill) {
    this.billToEdit.next(bill);
  }

  clearBill() {
    this.billToEdit.next(null);
  }
}
