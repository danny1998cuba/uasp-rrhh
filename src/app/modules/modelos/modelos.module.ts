import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelosRoutingModule } from './modelos-routing.module';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';



@NgModule({
  declarations: [
    ModeloSkeletonComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ModelosRoutingModule
  ]
})
export class ModelosModule { }
