import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesoresComponent } from './profesores.component';
import { ShareModules } from '../../shared/share.modules';


@NgModule({
  declarations: [
    ProfesoresComponent
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ShareModules
  ]
})
export class ProfesoresModule { }
