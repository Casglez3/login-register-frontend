import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {

  private apiUrl = environment.apiUrl; // URL de la API

  constructor(private http: HttpClient, private authService : AuthService) { }


  //Método para actualizar usuario
  updateUser(user: any, token: any): Observable<any> {
    const idUser = this.authService.getUserId();
    return this.http.put(`${this.apiUrl}/api/users/${idUser}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Método para eliminar usuario
  deleteUser(token: any): Observable<any> {
    const idUser = this.authService.getUserId();
    return this.http.delete(`${this.apiUrl}/api/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}

