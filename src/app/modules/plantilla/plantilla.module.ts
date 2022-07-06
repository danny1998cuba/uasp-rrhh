import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlantillaRoutingModule } from './plantilla-routing.module';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { P2Component } from './p2/p2.component';
import { InitComponent } from './init/init.component';
import { TrabAddModComponent } from './trabajadores/trab-add-mod/trab-add-mod.component';
import { TrabajadoresFiltersComponent } from './trabajadores-filters/trabajadores-filters.component';
import { FiltersSelectorComponent } from './trabajadores-filters/filters-selector/filters-selector.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AprobCubiertaComponent } from './aprob-cubierta/aprob-cubierta.component';
import { TrabajadoresUnidadComponent } from './trabajadores-unidad/trabajadores-unidad.component';



@NgModule({
  declarations: [
    PlantillaSkeletonComponent,
    TrabajadoresComponent,
    P2Component,
    InitComponent,
    TrabAddModComponent,
    TrabajadoresFiltersComponent,
    FiltersSelectorComponent,
    AprobCubiertaComponent,
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
