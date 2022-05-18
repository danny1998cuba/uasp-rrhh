import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantillaRoutingModule } from './plantilla-routing.module';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { P2Component } from './p2/p2.component';
import { InitComponent } from './init/init.component';



@NgModule({
  declarations: [
    PlantillaSkeletonComponent,
    TrabajadoresComponent,
    P2Component,
    InitComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlantillaRoutingModule
  ]
})
export class PlantillaModule { }
