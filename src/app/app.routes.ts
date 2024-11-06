import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { HeroComponent } from './hero/hero.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'about', component: AboutComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'contact', component: ContactComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];

// In AuthGuard or related files where localStorage is accessed
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  // Your logic to check token
}