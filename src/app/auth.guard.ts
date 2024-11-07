import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    // Check if running in the browser (avoid SSR issues with localStorage)
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log(localStorage);
      
      // If no token found or token is expired, redirect to login
      if (!token || this.isTokenExpired(token)) {
        console.log("console log forces");
        this.router.navigate(['/login']);
        return false;
      }
      console.log("hello");
      return true;
    }

    // Return false or handle redirection for SSR (server-side rendering) case
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp < Date.now() / 1000;  // Check if token is expired
    } catch (e) {
      return true;  // Invalid token or decoding error
    }
  }
}
