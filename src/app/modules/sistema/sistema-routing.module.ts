import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';

export const routes: Routes = [
    {
        path:'',
        component:SistemaSkeletonComponent,
        children:[
            
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }