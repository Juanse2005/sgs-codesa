import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

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
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'estudiantes',
        loadChildren: () =>
          import('./views/estudiantes/estudiantes.module').then((m) => m.EstudiantesModule),
      },
      {
        path: 'personas',
        loadChildren: () =>
          import('./views/personas/personas.module').then((m) => m.PersonasModule),
      },
      {
        path: 'profesores',
        loadChildren: () =>
          import('./views/profesores/profesores.module').then((m) => m.ProfesoresModule),
      },
      {
        path: 'administrativos',
        loadChildren: () =>
          import('./views/administrativos/administrativos.module').then((m) => m.AdministrativosModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./views/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./views/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
      },
    ],
  },
  { path: 'nav', loadChildren: () => import('./shared/components/layout/layout.module').then(m => m.LayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
