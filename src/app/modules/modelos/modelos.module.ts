import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelosRoutingModule } from './modelos-routing.module';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';
import { InitComponent } from './init/init.component';
import { OmeiComponent } from './omei/omei.component';



@NgModule({
  declarations: [
    ModeloSkeletonComponent,
    InitComponent,
    OmeiComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ModelosRoutingModule
  ]
})
export class ModelosModule { }
