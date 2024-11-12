// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUserFromToken(); // Decodifica el token y obtiene el objeto de usuario
    const rolId = user?.rolId; // Accede al rolId del usuario si existe

    console.log(`User Role ID: ${rolId}`); // Imprime el rolId para depuración

    // Verifica si el rol del usuario está en la lista de roles permitidos de la ruta
    if (route.data['roles'] && route.data['roles'].includes(rolId)) {
      return true; // Permite el acceso si el rol es válido
    }

    // Redirige al login si el rol no es permitido
    this.router.navigate(['/login']);
    return false;
  }
}
