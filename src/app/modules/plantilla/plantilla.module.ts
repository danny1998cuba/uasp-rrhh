import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantillaRoutingModule } from './plantilla-routing.module';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { P2Component } from './p2/p2.component';
import { InitComponent } from './init/init.component';
import { TrabAddModComponent } from './trabajadores/trab-add-mod/trab-add-mod.component';



@NgModule({
  declarations: [
    PlantillaSkeletonComponent,
    TrabajadoresComponent,
    P2Component,
    InitComponent,
    TrabAddModComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlantillaRoutingModule
  ]
})
export class PlantillaModule { }
