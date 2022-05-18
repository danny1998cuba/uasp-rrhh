import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';



@NgModule({
  declarations: [
    SistemaSkeletonComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
