import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Personas } from '../../shared/models/personas/personas';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  personas_form: Personas = {} as Personas
  visible_post: boolean = false;
  showPasswordPost: boolean = false;


  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error de login', err);
      },

    });
  }
  register() {
    this.authService.register(this.personas_form).subscribe({
      next: (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        window.location.reload();
      },
      error: (err) => {
        console.error('Error de login', err);
      },
    });
  }


}