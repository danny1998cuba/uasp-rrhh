import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './init/init.component';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';

export const routes: Routes = [
    {
        path:'',
        component:ModeloSkeletonComponent,
        children:[
            {
                path:'',
                component:InitComponent
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModelosRoutingModule { }