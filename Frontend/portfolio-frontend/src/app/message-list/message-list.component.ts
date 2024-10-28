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
  standalone: true,
  imports: [CommonModule], // Register CommonModule here
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  successMessage: string | null = null; // Define successMessage to show feedback

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.http.get<Message[]>('http://localhost:5000/messages').subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  // Method to set success message (optional, depending on your design)
  setSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000); // Auto-clear after 5 seconds
  }
}
