import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Interceptor que agrega el token de autorización a todas las solicitudes HTTP si existe,
 * y maneja errores 401 redirigiendo al login y limpiando el token del almacenamiento local.
 */
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem('userToken');
    const token = currentUser ? JSON.parse(currentUser).token : null;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          localStorage.removeItem('userToken');
          console.error('Error 401: Unauthorized', error);
        }
        return throwError(error);
      })
    );
  }
}
