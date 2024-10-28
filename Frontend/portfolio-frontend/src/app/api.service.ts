// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000/contact';
  sendContactMessage: any;

  constructor(private http: HttpClient) {}

  sendContactData(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }
}
