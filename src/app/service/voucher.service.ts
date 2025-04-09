import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voucher } from '../model/Voucher';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private vouchers = signal<Voucher[]>([]);
  private baseUrl = 'http://localhost:3004/vouchers';

  constructor(private http: HttpClient) {
    this.loadVouchers();
  }

  get allVouchers() {
    return computed(() => this.vouchers());
  }

  loadVouchers() {
    this.http.get<Voucher[]>(this.baseUrl).subscribe(data => this.vouchers.set(data));
  }

  saveVoucher(voucher: Voucher) {
    this.http.post<Voucher>(this.baseUrl, voucher).subscribe(saved => {
      this.vouchers.update(v => [...v, saved]);
    });
    
  }
  getVoucherById(voucherId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${voucherId}`);
  }

  // Create a new voucher
  createVoucher(voucherData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, voucherData);  // POST request to save the voucher
  }
  
}