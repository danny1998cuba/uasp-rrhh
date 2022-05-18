import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantillaRoutingModule } from './plantilla-routing.module';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';



@NgModule({
  declarations: [
    PlantillaSkeletonComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlantillaRoutingModule
  ]
})
export class PlantillaModule { }
