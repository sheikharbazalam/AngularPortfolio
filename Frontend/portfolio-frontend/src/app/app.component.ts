import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MessageListComponent } from './message-list/message-list.component';
import { CommonModule } from '@angular/common';
import { MenubarsComponent } from './menubars/menubars.component'; 
import { NgForm } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormsModule, MessageListComponent,CommonModule,MenubarsComponent, NavbarComponent],
  standalone: true
})
export class AppComponent {
  successMessage: string | null = null; // Define successMessage

  showMessage = false;

  
  toggleMessageList(){
  this.showMessage = !this.showMessage;
  }



  //Observable handling error using catchError() and map() for transform or log the response as needed.

  /*
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //private apiUrl = 'http://localhost:5000/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers }).pipe(
      map(response => {
        console.log('Server response:', response);
        return response;
      }),
      catchError(error => {
        console.error('Request failed:', error);
        throw new Error(`Error: ${error.message}`);
      })
    );
  }
}

  */

  constructor(private http: HttpClient) {}

 
onSubmit(contactForm: NgForm) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.http.post(' http://127.0.0.1:5000/contact', contactForm.value, { headers })
    .subscribe({
      next: (response) => {
        console.log('Success!', response);
        this.successMessage = 'Message sent successfully!';
        contactForm.reset();
        
      },
      error: (error) => {
        console.error('Error!', error);
        alert(`An error occurred: ${error.message}`);
      }
    });
}
  
  
  scrollTo(section: string) {
    const element = document.getElementById(section);
  if (element) {
   element.scrollIntoView({ behavior: 'smooth' });
    }}

}


