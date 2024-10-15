import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { CommonModule } from "@angular/common";
import { catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: "app-user-home",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent {

  updateUserForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";
  userName: string | null; // Nueva propiedad para almacenar el nombre de usuario para que se pueda usar en el HTML para que aparezca el nombre del usuario en el mensaje 


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) {
    this.updateUserForm = this.formBuilder.group({
      userName: [""],
      newPassword: [
        "",
        [
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
      confirmNewPassword: [""],
    });

    // Obtenemos el nombre de usuario del servicio de autenticación y lo almacenamos en la propiedad userName
    this.userName = authService.getUserName();
  }


  // Método para eliminar usuario
  deleteUser(): void {
    const token = localStorage.getItem("auth_token");

    this.userService.deleteUser(token).pipe(
      tap((response) => {
        console.log(response);
        localStorage.removeItem("auth_token");
        this.authService.setUserName(null);
        this.errorMessage = "Usuario eliminado correctamente";
        this.authService.setLoggedIn(false);
        this.router.navigate(["/login"]);

      }),
      catchError((error) => {
        console.log(error);
        this.errorMessage = "Se ha producido un error al eliminar el usuario";
        return of(null);
      })
    ).subscribe();
  }


  // Método para enviar el formulario de actualización de usuario 
  onSubmit(): void {
    if (this.updateUserForm.valid) {
      const formData = this.updateUserForm.value;

      // Validar si las contraseñas coinciden solo si se ha proporcionado una nueva contraseña
      if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
        this.errorMessage = "Las contraseñas no coinciden";
        return;
      }

      // Obtenemos el token del localStorage
      const token = localStorage.getItem("auth_token");


      // Creamos un objeto para enviar solo los campos que se han actualizado
      const dataToSend: any = {};
      if (formData.userName) {
        dataToSend.userName = formData.userName;
      }
      if (formData.newPassword) {
        dataToSend.password = formData.newPassword;
      }

      // Llamamos al método updateUser del servicio UserService
      this.userService.updateUser(dataToSend, token).pipe(
        tap((response) => {
          console.log(response);
          this.successMessage = "Usuario actualizado correctamente";
          this.userName = formData.userName; // Actualizamos el nombre de usuario en la propiedad userName
          this.updateUserForm.reset(); // Reseteamos el formulario
        }),
        catchError((error) => {
          console.log(error);
          this.errorMessage = "Se ha producido un error al actualizar el usuario";
          return of(null);
        })
      ).subscribe();
    }
  }
}