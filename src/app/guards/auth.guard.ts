import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  public subscription: any;


  constructor(private authService: AuthService, private router: Router) {}


  // Método para comprobar si el usuario está autenticado
  canActivate(): boolean {
    const isAthenticated = this.checkLogin();
    if (isAthenticated) { // Si el usuario está logueado permitir acceso
      return true; 
    } else {
      this.router.navigate(["/login"]); // Redirigir al login si no está autenticado
      return false;
    }
  }

  // Método para comprobar si el usuario está logueado
  checkLogin(): boolean {
    let isAuth = false; 
    this.subscription = this.authService.isLoggedIn$.subscribe((value) => {
      isAuth = value;
    });
    return isAuth;
  }
}
