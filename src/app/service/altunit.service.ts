import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitConversion } from '../model/Altunit';

@Injectable({
  providedIn: 'root'
})
export class AltunitService {
  private apiUrl = 'http://localhost:3011/unitConversions';
  constructor(private http: HttpClient) { }
  saveUnitConversion(unitData: UnitConversion): Observable<UnitConversion> {
    return this.http.post<UnitConversion>(this.apiUrl,unitData);  
  }
}
