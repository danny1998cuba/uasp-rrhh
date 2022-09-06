import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelosRoutingModule } from './modelos-routing.module';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';
import { InitComponent } from './init/init.component';
import { OmeiComponent } from './omei/omei.component';
import { GrupoEscalaComponent } from './grupo-escala/grupo-escala.component';
import { P2Component } from './p2/p2.component';
import { AprobCubiertaComponent } from './aprob-cubierta/aprob-cubierta.component';
import { AusentismoComponent } from './ausentismo/ausentismo.component';
import { DatabaseComponent } from './database/database.component';
import { LevantamientoComponent } from './levantamiento/levantamiento.component';



@NgModule({
  declarations: [
    ModeloSkeletonComponent,
    InitComponent,
    OmeiComponent,
    GrupoEscalaComponent,
    P2Component,
    AprobCubiertaComponent,
    AusentismoComponent,
    DatabaseComponent,
    LevantamientoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ModelosRoutingModule
  ]
})
export class ModelosModule { }
