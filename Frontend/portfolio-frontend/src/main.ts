import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { SkillsComponent } from './app/skills/skills.component';
import { ContactComponent } from './app/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

// Define routes for each component
const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Enable fetch for HttpClient
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule) // Set up routing
  ]
}).catch((err) => console.error(err));
