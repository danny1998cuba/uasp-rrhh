import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { SISTEMA_CHILDREN } from 'src/app/data/constants';
import { CargosComponent } from './cargos/cargos.component';
import { CatDocComponent } from './cat-doc/cat-doc.component';
import { CatOcupComponent } from './cat-ocup/cat-ocup.component';
import { ClaComponent } from './cla/cla.component';
import { DepCargoComponent } from './dep-cargo/dep-cargo.component';
import { EscalasComponent } from './escalas/escalas.component';
import { InitComponent } from './init/init.component';
import { NivelEscolarComponent } from './nivel-escolar/nivel-escolar.component';
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: '',
        component: SistemaSkeletonComponent,
        children: [
            {
                path: '',
                component: InitComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.UNIDADES,
                component: UnidadesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.ESCALAS,
                component: EscalasComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.CARGOS,
                component: CargosComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.CAT_OCUP,
                component: CatOcupComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.CAT_DOC,
                component: CatDocComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.NIVEL,
                component: NivelEscolarComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.PLAZAS,
                component: DepCargoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.CLA,
                component: ClaComponent,
                canActivate: [AuthGuard]
            },
            {
                path: SISTEMA_CHILDREN.USUARIOS,
                component: UsuariosComponent,
                canActivate: [AuthGuard]
            }
        ],
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }