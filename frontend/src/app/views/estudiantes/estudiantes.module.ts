import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { ShareModules } from '../../shared/share.modules';


@NgModule({
  declarations: [
    EstudiantesComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    ShareModules
  ]
})
export class EstudiantesModule { }
