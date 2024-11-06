import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { SkillsComponent } from './app/skills/skills.component';
import { ContactComponent } from './app/contact/contact.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { MessageListComponent } from './app/message-list/message-list.component';
import { appRoutes } from './app/app.routes';
//import { appRoutes } from './app/app.route';

// Define routes for each component
/*const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on load
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'message-list', component: MessageListComponent },
  { path: '**', redirectTo: '/login' } // Redirect all unknown paths to login
];*/

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Enable fetch for HttpClient
    provideRouter(appRoutes), // Set up routing
  ]
}).catch((err) => console.error(err));


/*const token  = localStorage.getItem('token');
if (!token) {
window.location.href='/login';

} else {
  window.location.href ='/home';
}

/*  provideHttpClient(
      withInterceptorsFromDi() // Use this if you want to add interceptors
    ),*/