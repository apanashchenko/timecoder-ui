import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      localStorage.clear()
      this.router.navigate(['login']);
      return false;
    }
    if (this.authService.isTokenExpired()) {
      return false;
    }
    return true;
  }
}
