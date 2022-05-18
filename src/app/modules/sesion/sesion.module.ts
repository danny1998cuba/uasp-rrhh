import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SesionRoutingModule } from './sesion-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  exports: [
    SesionRoutingModule
  ]
})
export class SesionModule { }
