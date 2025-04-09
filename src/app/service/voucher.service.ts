import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voucher } from '../model/Voucher';

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
}