import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../model/View';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private jsonUrl ='http://localhost:3002/billingData';
  constructor(private http: HttpClient) {}
  getbillingData(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.jsonUrl); 
  }
  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`);
  }
}