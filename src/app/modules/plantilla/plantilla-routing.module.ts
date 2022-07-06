import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { PLANTILLA_CHILDREN } from 'src/app/data/constants';
import { AprobCubiertaComponent } from './aprob-cubierta/aprob-cubierta.component';
import { InitComponent } from './init/init.component';
import { P2Component } from './p2/p2.component';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresFiltersComponent } from './trabajadores-filters/trabajadores-filters.component';
import { TrabajadoresUnidadComponent } from './trabajadores-unidad/trabajadores-unidad.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

export const routes: Routes = [
    {
        path:'',
        component:PlantillaSkeletonComponent,
        children:[
            {
                path:'',
                component:InitComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.TRABAJADORES,
                component: TrabajadoresComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.APROB,
                component: AprobCubiertaComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.UNIDAD,
                component: TrabajadoresUnidadComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.FILTERS,
                component: TrabajadoresFiltersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.P2,
                component: P2Component,
                canActivate: [AuthGuard]
            },
        ],
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlantillaRoutingModule { }