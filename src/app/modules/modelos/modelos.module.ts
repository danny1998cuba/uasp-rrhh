import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelosRoutingModule } from './modelos-routing.module';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';
import { InitComponent } from './init/init.component';



@NgModule({
  declarations: [
    ModeloSkeletonComponent,
    InitComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ModelosRoutingModule
  ]
})
export class ModelosModule { }
