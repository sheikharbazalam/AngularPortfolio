/*import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};*/

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log(localStorage);
    
    // If no token found or token is expired, redirect to login
    if (!token || this.isTokenExpired(token)) {
      console.log("console log forces")
      this.router.navigate(['/login']);
      return false;
    }
    console.log("hello");
    return true;
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
