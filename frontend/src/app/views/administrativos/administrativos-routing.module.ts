import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativosComponent } from './administrativos.component';

const routes: Routes = [{ path: '', component: AdministrativosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativosRoutingModule { }
