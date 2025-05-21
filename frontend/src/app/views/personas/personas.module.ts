import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import { ShareModules } from '../../shared/share.modules';


@NgModule({
  declarations: [
    PersonasComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    ShareModules
  ]
})
export class PersonasModule { }
