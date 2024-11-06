import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-message-list',
  host: { '[attr.data-id]': '"message-list-unique"' },
  standalone: true,
  imports: [CommonModule], // Register CommonModule here
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  successMessage: string | null = null; // Define successMessage to show feedback
  errorMessage: string | null = null; // Add errorMessage for API errors

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.http.get<Message[]>('http://127.0.0.1:5000/messages').subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching messages. Please try again later.';
        console.error('Error fetching messages:', error);
      }
    });
  }

  // Method to set success message (optional, depending on your design)
  setSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000); // Auto-clear after 5 seconds
  }
}
