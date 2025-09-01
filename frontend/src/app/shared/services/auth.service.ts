import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login/loginRequest';
import { AuthResponse } from '../models/login/authResponse';
import { Personas } from '../models/personas/personas';
import { Register } from '../models/login/register';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly storageKey: string = 'userToken';

  public headers = new HttpHeaders();
  protected apiURL = environment.apiURL

  constructor(protected _httpClient: HttpClient, private router: Router) { }

  /** Envía las credenciales al backend para iniciar sesión y devuelve la respuesta de autenticación*/
  login(data: LoginRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>
      (`${this.apiURL}/auth/login`, data, { headers: this.headers });
  }

  /**  Envía los datos de registro al backend y devuelve la respuesta de autenticación*/
  register(data: Register): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>
      (`${this.apiURL}/auth/register`, data, { headers: this.headers });
  }

  /** Elimina el token de autenticación del almacenamiento local y redirige al login*/
  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  /**  Verifica si el usuario está autenticado comprobando la existencia del token 
  * en el almacenamiento local*/
  isAuthenticated(): boolean {
  const token = localStorage.getItem(this.storageKey);
  return !!token;
  }

}

