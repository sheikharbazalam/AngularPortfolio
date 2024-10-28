import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageListComponent } from './message-list/message-list.component';
import { CommonModule } from '@angular/common';
import { MenubarsComponent } from './menubars/menubars.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormsModule, MessageListComponent,CommonModule,MenubarsComponent],
  standalone: true
})
export class AppComponent {
  successMessage: string | null = null; // Define successMessage

  constructor(private http: HttpClient) {}

  onSubmit(form: any) {
    this.http.post('http://localhost:5000/contact', form.value)
      .subscribe(response => {
        console.log('Message stored:', response);
        form.reset();
        this.successMessage = 'Your message has been successfully sent!'; // Set success message
        setTimeout(() => this.successMessage = null, 5000); // Clear message after 5 seconds
      }, error => {
        console.error('Error:', error);
      });
  }
  scrollTo(section: string) {
    const element = document.getElementById(section);
  if (element) {
   element.scrollIntoView({ behavior: 'smooth' });
    }}

}


