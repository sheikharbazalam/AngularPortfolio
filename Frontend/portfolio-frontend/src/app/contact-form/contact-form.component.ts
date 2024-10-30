import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {

    this.http.post('http://127.0.0.1:5000/contact', this.contactData).subscribe(
      (response) => {
        console.log('Message sent successfully', response);
        // Optionally reset the form or show a success message here
      },
      (error) => {
        console.error('Error sending message', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}
