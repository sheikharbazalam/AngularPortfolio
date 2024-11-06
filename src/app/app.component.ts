import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, provideHttpClient, withFetch } from '@angular/common/http';
import { MessageListComponent } from './message-list/message-list.component';
import { CommonModule } from '@angular/common';
import { MenubarsComponent } from './menubars/menubars.component'; 
import { NgForm ,FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectListComponent } from './project-list/project-list.component';

//import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ContactComponent,FooterComponent,ContactComponent,ProjectListComponent,SkillsComponent,AboutComponent,HeroComponent, FormsModule, MessageListComponent,CommonModule,MenubarsComponent, NavbarComponent,RouterModule],
  standalone: true,
 

})
export class AppComponent {
  http: any;
  

  title(title: any) {
    throw new Error('Method not implemented.');
  }
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

  constructor(private authService: AuthService, private router: Router, http: HttpClient) {

  
  }

  logout() {
    this.authService.logout();  // Clear the token in AuthService
    localStorage.removeItem('token');  // Optional: Clear the token from local storage
    this.router.navigate(['/login']);  // Redirect to login page
  }

 
onSubmit(contactForm: NgForm) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.http.post(' http://127.0.0.1:5000/contact', contactForm.value, { headers })
    .subscribe({
      next: (response: any) => {
        console.log('Success!', response);
        this.successMessage = 'Message sent successfully!';
        contactForm.reset();
        
      },
      error: (error: { message: any; }) => {
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


function logout() {
  throw new Error('Function not implemented.');
}

