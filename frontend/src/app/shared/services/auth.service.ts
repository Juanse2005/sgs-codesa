import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login/loginRequest';
import { AuthResponse } from '../models/login/authResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private readonly storageKey: string = 'currentUser';

    public headers = new HttpHeaders();
    protected apiURL = environment.apiURL

    constructor(protected _httpClient: HttpClient, private router: Router) { }

    login( data: LoginRequest): Observable<AuthResponse> {
        return this._httpClient.post<AuthResponse>
        (`${this.apiURL}/auth/login`, data, { headers: this.headers });
    }

    // setCurrentUser(user: any) {
    //     localStorage.setItem(this.storageKey, JSON.stringify(user));
    // }

    // logout() {
    //     localStorage.removeItem(this.storageKey);
    //     this.router.navigate(['/login']);
    // }


    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    // }
}

