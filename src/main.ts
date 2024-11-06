import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, RouterModule  } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';



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