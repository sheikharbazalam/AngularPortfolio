import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';  // Backend URL

  constructor(private http: HttpClient) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');  // Check local storage for token
    return !!token;  // Return true if token exists, otherwise false
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { headers });  // POST to /login
  }

  // Signup method
  signup(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signup`, { email, password });
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');  // Clear token from local storage
  }
}
