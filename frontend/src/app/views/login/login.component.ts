import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error de login', err);
      },
    });
  }


}