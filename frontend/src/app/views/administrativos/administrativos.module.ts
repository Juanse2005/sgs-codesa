import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativosRoutingModule } from './administrativos-routing.module';
import { AdministrativosComponent } from './administrativos.component';
import { ShareModules } from '../../shared/share.modules';


@NgModule({
  declarations: [
    AdministrativosComponent
  ],
  imports: [
    CommonModule,
    AdministrativosRoutingModule,
    ShareModules
  ]
})
export class AdministrativosModule { }
