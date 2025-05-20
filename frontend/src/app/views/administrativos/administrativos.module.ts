import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativosRoutingModule } from './administrativos-routing.module';
import { AdministrativosComponent } from './administrativos.component';


@NgModule({
  declarations: [
    AdministrativosComponent
  ],
  imports: [
    CommonModule,
    AdministrativosRoutingModule
  ]
})
export class AdministrativosModule { }
