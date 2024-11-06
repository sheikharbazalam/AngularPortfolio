import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule,RouterModule]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]  // Add confirmPassword here
    });
  }

  // Add passwordsMatch method to compare password and confirmPassword
  passwordsMatch(): boolean {
    return (
      this.signupForm.get('password')?.value === this.signupForm.get('confirmPassword')?.value
    );
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.authService.signup(email, password).subscribe({
        next: (response) => {
          // Check if localStorage is available
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('token', response.token); // Store token after signup
          }
          this.router.navigate(['/home']); // Redirect to home after signup
        },
        error: (err) => {
          console.error('Signup error:', err);
          // Handle error appropriately
        },
      });
    }
  }
  
  
}
