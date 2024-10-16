import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  
  private apiUrl =  environment.apiUrl; // URL de la API 
  private _isLoggedInSubject = new BehaviorSubject<boolean>(false); // Cambiamos a BehaviorSubject para poder emitir el estado actual
  private _userId: string | null = null; // Propiedad para almacenar el id del usuario
  private _userName: string | null = null; // Propiedad para almacenar el nombre del usuario

  constructor(private http: HttpClient, private router: Router) {
    // Al inicializar el servicio, comprobar si el usuario ya tiene un token guardado
    const token = localStorage.getItem("auth_token");
    this._isLoggedInSubject.next(!!token); // Emitimos el estado inicial
  }

  // Observable que permite a los componentes suscribirse
  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedInSubject.asObservable();
  }

  // Setter de isLoggedIn, método para cambiar el estado de autenticación
  setLoggedIn(value: boolean): void {
    this._isLoggedInSubject.next(value);
  }

  //Getter and Setter para el userId
  getUserId(): string | null {
    return this._userId;
  }

  setUserId(value: string ): void {
    this._userId = value;
  }

  //Getter and Setter para el nombre del usuario

  getUserName(): string | null {
    return this._userName;
  }

  setUserName(value: string | null): void {
    this._userName = value;
  }

  // Método register
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  // Método login
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user)
  }

  // Método logout
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userName");
    this.setLoggedIn(false); // Emitimos que el usuario ha cerrado sesión
    this.router.navigate(["/login"]); // Redirige al login
  }
}
