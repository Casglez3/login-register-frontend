import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css"
})
export class NavbarComponent  {

  isAuth: boolean = false;
  public subscription: any;

  constructor(private authService: AuthService) {}
  
  // Método para comprobar si el usuario está autenticado al cargar el componente 
  ngOnInit(): void { 
    this.subscription = this.authService.isLoggedIn$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
  }

}