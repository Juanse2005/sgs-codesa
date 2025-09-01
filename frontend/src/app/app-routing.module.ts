import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './config/auth.guard';

/** Modulo donde se definen las rutas principales del sistema
 * Cada ruta puede cargar un módulo de forma perezosa (lazy loading) para optimizar el rendimiento.
 * Se utiliza un guard de autenticación (authGuard) para proteger las rutas que requieren autenticación.
 */

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { animation: 'DashboardPage' },
      },
      {
        path: 'estudiantes',
        loadChildren: () =>
          import('./views/estudiantes/estudiantes.module').then(
            (m) => m.EstudiantesModule
          ),
        data: { animation: 'EstudiantesPage' },
      },
      {
        path: 'personas',
        loadChildren: () =>
          import('./views/personas/personas.module').then(
            (m) => m.PersonasModule
          ),
        data: { animation: 'PersonasPage' },
      },
      {
        path: 'profesores',
        loadChildren: () =>
          import('./views/profesores/profesores.module').then(
            (m) => m.ProfesoresModule
          ),
        data: { animation: 'ProfesoresPage' },
      },
      {
        path: 'administrativos',
        loadChildren: () =>
          import('./views/administrativos/administrativos.module').then(
            (m) => m.AdministrativosModule
          ),
        data: { animation: 'AdministrativosPage' },
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./views/cursos/cursos.module').then((m) => m.CursosModule),
        data: { animation: 'CursosPage' },
      },

      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./views/inscripciones/inscripciones.module').then(
            (m) => m.InscripcionesModule
          ),
        data: { animation: 'IscripcionesPage' },
      },
    ],
  },
  {
    path: 'nav',
    loadChildren: () =>
      import('./shared/components/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
