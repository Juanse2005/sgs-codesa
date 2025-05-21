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
  private readonly storageKey: string = 'token';

  public headers = new HttpHeaders();
  protected apiURL = environment.apiURL

  constructor(protected _httpClient: HttpClient, private router: Router) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>
      (`${this.apiURL}/auth/login`, data, { headers: this.headers });
  }

  register(data: Register): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>
      (`${this.apiURL}/auth/register`, data, { headers: this.headers });
  }
  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}

