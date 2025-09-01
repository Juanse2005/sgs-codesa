import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    PanelMenuModule,
    SplitButtonModule,
    AvatarModule,
    ButtonModule,
    DialogModule 
  ]
})
export class LayoutModule { }
