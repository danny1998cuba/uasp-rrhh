import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';

export const routes: Routes = [
    {
        path:'',
        component:PlantillaSkeletonComponent,
        children:[
            
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlantillaRoutingModule { }