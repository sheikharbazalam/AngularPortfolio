import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngForm
import { MessageListComponent } from '../message-list/message-list.component'; // Import the message list component

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageListComponent], // Registering necessary imports here
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  showMessage = false;
  successMessage: string | null = null;

  constructor(private http: HttpClient) {}

  toggleMessageList() {
    this.showMessage = !this.showMessage;
  }

  onSubmit(contactForm: any): void {
    if (contactForm.valid) {
      // Handle form submission
      const formData = contactForm.value;

      // Example of sending form data to the backend (replace with your actual API endpoint)
      this.http.post('http://127.0.0.1:5000/contact', formData).subscribe({
        next: () => {
          this.successMessage = 'Thank you for contacting us!';
          contactForm.reset();
        },
        error: () => {
          this.successMessage = 'There was an error submitting your message. Please try again.';
        }
      });
    }
  }
}



/* <a
      routerLink="/projects"
      class="px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700"
      >View My Work</a
    >*/
