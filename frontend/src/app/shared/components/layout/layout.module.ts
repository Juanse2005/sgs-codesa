import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
  declarations: [
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    PanelMenuModule
  ]
})
export class LayoutModule { }
