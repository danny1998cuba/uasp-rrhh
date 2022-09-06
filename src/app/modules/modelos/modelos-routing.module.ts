import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { MODELOS_CHILDREN } from 'src/app/data/constants';
import { AprobCubiertaComponent } from './aprob-cubierta/aprob-cubierta.component';
import { AusentismoComponent } from './ausentismo/ausentismo.component';
import { DatabaseComponent } from './database/database.component';
import { GrupoEscalaComponent } from './grupo-escala/grupo-escala.component';
import { InitComponent } from './init/init.component';
import { LevantamientoComponent } from './levantamiento/levantamiento.component';
import { ModeloSkeletonComponent } from './modelo-skeleton/modelo-skeleton.component';
import { OmeiComponent } from './omei/omei.component';
import { P2Component } from './p2/p2.component';

export const routes: Routes = [
    {
        path: '',
        component: ModeloSkeletonComponent,
        children: [
            {
                path: '',
                component: InitComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.APROB,
                component: AprobCubiertaComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.P2,
                component: P2Component,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.GRUPO_ESCALA,
                component: GrupoEscalaComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.DATABASE,
                component: DatabaseComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.AUSENTISMO,
                component: AusentismoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: MODELOS_CHILDREN.SITUACION,
                component: LevantamientoComponent,
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