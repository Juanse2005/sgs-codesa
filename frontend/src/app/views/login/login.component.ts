import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Personas } from '../../shared/models/personas/personas';
import { MessageService } from 'primeng/api';

/**
 * Componente para el inicio de sesion.
 *
 * Permite al usuario autenticarse en la aplicación y también registrarse.
 * Ofrece funcionalidades como validar credenciales, generar un token de sesión
 * y manejar errores de autenticación.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  personas_form: Personas = {} as Personas;
  visible_post: boolean = false;
  showPasswordPost: boolean = false;

  /**
   * Constructor en el cual se inyectan los servicios necesarios
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.removeUserToken();
  }

  /**
   * Realiza el proceso de login
   *
   * Envía email y password al AuthService
   * Si es exitoso, guarda el token en localStorage
   * Redirige al dashboard
   */
  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('userToken', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.ErrorToast(err.error.message);
        },
      });
  }

  /**
   * Realiza el proceso de registro de una nueva persona
   *
   * Envía los datos del formulario al AuthService
   * Si es exitoso, guarda el token en localStorage
   */
  register() {
    this.authService.register(this.personas_form).subscribe({
      next: (res) => {
        this.SuccessToast('Registro exitoso. Por favor, inicie sesión.');
      },
      error: (err) => {
        this.ErrorToast(err.error.message);
      },
    });
  }

  /** Al inicializar el componente, se elimina cualquier token de usuario existente
   * para asegurar que el usuario inicie sesión desde cero.
   */
  removeUserToken() {
    localStorage.removeItem('userToken');
  }

  /** Tarjetas de notificacion de exito y error */
  SuccessToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: detail,
    });
  }

  ErrorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }
}
