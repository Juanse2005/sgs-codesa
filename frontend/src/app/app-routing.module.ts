import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  {
    path: '',
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
          }
        ]
      }
    ]
  },
  { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'estudiantes', loadChildren: () => import('./views/estudiantes/estudiantes.module').then(m => m.EstudiantesModule) },
  { path: 'personas', loadChildren: () => import('./views/personas/personas.module').then(m => m.PersonasModule) },
  { path: 'profesores', loadChildren: () => import('./views/profesores/profesores.module').then(m => m.ProfesoresModule) },
  { path: 'administrativos', loadChildren: () => import('./views/administrativos/administrativos.module').then(m => m.AdministrativosModule) },
  { path: 'cursos', loadChildren: () => import('./views/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'inscripciones', loadChildren: () => import('./views/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
