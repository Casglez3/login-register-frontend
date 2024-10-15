import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage: string = "";

    constructor(private router: Router, private loginBuilder: FormBuilder, private authService: AuthService) {

      //Creamos el formulario de login con las validaciones necesarias
        this.loginForm = this.loginBuilder.group({
            userName: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    //Método para enviar el formulario de login
    onSubmit(): void {
        if (this.loginForm.valid) {
            const formData = this.loginForm.value;

            this.authService.login(formData).pipe(
                tap((response) => {
                    console.log(response);
                    // Guardamos el token en el localStorage y cambiamos el estado de autenticación a true para redirigir al usuario a la página de inicio
                    // Guardamos el id del usuario en el servicio de autenticación y el nombre de usuario usando el método setUserName
                    //Redirigimos al usuario a la página de inicio
                    this.authService.setLoggedIn(true);
                    this.authService.setUserId(response.id);
                    localStorage.setItem("auth_token", response.token);
                    this.authService.setUserName(response.userName);
                    this.router.navigate(["/user-home"]);
                }),
                catchError((error) => {
                  console.log(error);
                  this.errorMessage = "Usuario o contraseña incorrectos";
                  return of(null);
                })
                // Suscribirse al observable para realizar la petición HTTP
            ).subscribe();
          }else{
            this.errorMessage = "Por favor, completa todos los campos";
        }
    }
}
