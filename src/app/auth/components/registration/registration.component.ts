import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { tap, catchError } from "rxjs";
import { of } from "rxjs";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";


@Component({
  selector: "app-registration",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.css"
})
export class RegistrationComponent {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {

    //Crear el formulario de registro con las validaciones necesarias
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
      confirmPassword: ["", Validators.required],
    });
   }

  //Método para enviar el formulario de registro
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      if (formData.password !== formData.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden";
        return;
      }

      this.authService.register(formData).pipe(
        tap((response) => {
          console.log(response);
          // Redirige al usuario a la página de inicio de usuario si la petición es exitosa
          this.router.navigate(["/login"]);  
        }),
        catchError((error) => {
          console.log(error);
          this.errorMessage = "Se ha producido un error en el registro";
          return of(null);
        })
        // Suscribirse al observable para realizar la petición HTTP
      ).subscribe();
    } else {
      this.errorMessage = "Por favor, completa todos los campos";
    }
  }

}
