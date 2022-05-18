import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PLANTILLA_CHILDREN } from 'src/app/data/constants';
import { InitComponent } from './init/init.component';
import { P2Component } from './p2/p2.component';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

export const routes: Routes = [
    {
        path:'',
        component:PlantillaSkeletonComponent,
        children:[
            {
                path:'',
                component:InitComponent
            },
            {
                path: PLANTILLA_CHILDREN.TRABAJADORES,
                component: TrabajadoresComponent
            },
            {
                path: PLANTILLA_CHILDREN.P2,
                component: P2Component
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlantillaRoutingModule { }