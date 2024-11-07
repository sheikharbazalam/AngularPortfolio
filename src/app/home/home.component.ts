import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add CommonModule here
import { AuthService } from '../auth.service'; // Import your auth service
import { NavbarComponent } from '../navbar/navbar.component'; 
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenubarsComponent } from '../menubars/menubars.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Since it's a standalone component
  imports: [MenubarsComponent,RouterModule,CommonModule,NavbarComponent,AboutComponent,ContactComponent,SkillsComponent,ProjectListComponent, FooterComponent] // <-- Add CommonModule here
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Optional: Logout functionality
  onLogout() {
    this.authService.logout();  // Call the logout method in AuthService
    this.isAuthenticated = false;  // Set isAuthenticated to false
  }
}
