import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      return true; // El usuario está autenticado
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false; // El usuario no está autenticado
    }
  }
}
