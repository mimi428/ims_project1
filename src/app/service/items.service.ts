import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/Items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3001/items';

  constructor(private http: HttpClient) {}

  addItem(item: { itemName: string; barcode: string; unitName: string }): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }
  
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl); 
  }
 
  
}
