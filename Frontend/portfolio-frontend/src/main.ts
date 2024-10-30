import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { SkillsComponent } from './app/skills/skills.component';
import { ContactComponent } from './app/contact/contact.component';
import {  withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MessageListComponent } from './app/message-list/message-list.component';

// Define routes for each component
const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'message-list', component: MessageListComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Enable fetch for HttpClient
    provideRouter(routes), 
    provideHttpClient(
      withInterceptorsFromDi() // Use this if you want to add interceptors
    ),
     // Set up routing
  ]
}).catch((err) => console.error(err));
