import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'assets/db.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.get<{ users: { username: string; password: string }[] }>(this.dbUrl).pipe(
      map(data => {
        const user = data.users.find(u => u.username === username && u.password === password);
        return !!user; // Return true if user exists, false otherwise
      }),
      catchError(() => of(false)) // Handle errors gracefully
    );
  }
}
