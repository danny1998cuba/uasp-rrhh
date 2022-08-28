import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantillaRoutingModule } from './plantilla-routing.module';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { InitComponent } from './init/init.component';
import { TrabAddModComponent } from './trabajadores/trab-add-mod/trab-add-mod.component';
import { TrabajadoresFiltersComponent } from './trabajadores-filters/trabajadores-filters.component';
import { FiltersSelectorComponent } from './trabajadores-filters/filters-selector/filters-selector.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TrabajadoresUnidadComponent } from './trabajadores-unidad/trabajadores-unidad.component';



@NgModule({
  declarations: [
    PlantillaSkeletonComponent,
    TrabajadoresComponent,
    InitComponent,
    TrabAddModComponent,
    TrabajadoresFiltersComponent,
    FiltersSelectorComponent,
    TrabajadoresUnidadComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlantillaRoutingModule
  ]
})
export class PlantillaModule { }
