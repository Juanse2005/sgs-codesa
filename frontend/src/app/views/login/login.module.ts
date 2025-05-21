import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ShareModules } from '../../shared/share.modules';
import { NavComponent } from '../../shared/components/nav/nav.component';


@NgModule({
  declarations: [
    LoginComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ShareModules,
    
  ]
})
export class LoginModule { }
