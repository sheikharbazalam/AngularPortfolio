import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add CommonModule here
import { AuthService } from '../auth.service'; // Import your auth service
import { NavbarComponent } from '../navbar/navbar.component'; 
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Since it's a standalone component
  imports: [CommonModule,NavbarComponent,AboutComponent,ContactComponent] // <-- Add CommonModule here
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Optional: Logout functionality
  onLogout(): void {
    this.authService.logout();
  }
}
