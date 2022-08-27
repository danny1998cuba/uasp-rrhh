import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { MODELOS_CHILDREN } from 'src/app/data/constants';
import { InitComponent } from './init/init.component';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';
import { OmeiComponent } from './omei/omei.component';

export const routes: Routes = [
    {
        path:'',
        component:ModeloSkeletonComponent,
        children:[
            {
                path:'',
                component:InitComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.OMEI1,
                component: OmeiComponent,
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
export class ModelosRoutingModule { }