import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl ='http://localhost:3009/units';

  constructor(private http: HttpClient) {}

  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addUnit(unit: any): Observable<any> {
    return this.http.post(this.baseUrl, unit);
  }
}

