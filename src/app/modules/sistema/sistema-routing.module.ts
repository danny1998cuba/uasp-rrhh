import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SISTEMA_CHILDREN } from 'src/app/data/constants';
import { CargosComponent } from './cargos/cargos.component';
import { CatDocComponent } from './cat-doc/cat-doc.component';
import { CatOcupComponent } from './cat-ocup/cat-ocup.component';
import { ClaComponent } from './cla/cla.component';
import { EscalasComponent } from './escalas/escalas.component';
import { InitComponent } from './init/init.component';
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: '',
        component: SistemaSkeletonComponent,
        children: [
            {
                path:'',
                component:InitComponent
            },
            {
                path: SISTEMA_CHILDREN.UNIDADES,
                component: UnidadesComponent
            },
            {
                path: SISTEMA_CHILDREN.ESCALAS,
                component: EscalasComponent
            },
            {
                path: SISTEMA_CHILDREN.CARGOS,
                component: CargosComponent
            },
            {
                path: SISTEMA_CHILDREN.CAT_OCUP,
                component: CatOcupComponent
            },
            {
                path: SISTEMA_CHILDREN.CAT_DOC,
                component: CatDocComponent
            },
            {
                path: SISTEMA_CHILDREN.CLA,
                component: ClaComponent
            },
            {
                path: SISTEMA_CHILDREN.USUARIOS,
                component: UsuariosComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }