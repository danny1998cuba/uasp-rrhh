import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from 'src/app/core/guards';
import { PLANTILLA_CHILDREN, ROLES } from 'src/app/data/constants';
import { InitComponent } from './init/init.component';
import { PlantillaSkeletonComponent } from './plantilla-skeleton/plantilla-skeleton.component';
import { TrabajadoresFiltersComponent } from './trabajadores-filters/trabajadores-filters.component';
import { TrabajadoresUnidadComponent } from './trabajadores-unidad/trabajadores-unidad.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';

export const routes: Routes = [
    {
        path: '',
        component: PlantillaSkeletonComponent,
        children: [
            {
                path: '',
                component: InitComponent,
                canActivate: [AuthGuard]
            },
            {
                path: PLANTILLA_CHILDREN.TRABAJADORES,
                component: TrabajadoresComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    roles: [
                        ROLES.JDEP
                    ]
                }
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
            }
        ],
        canActivate: [AuthGuard, RoleGuard],
        data: {
            roles: [
                ROLES.USER,
                ROLES.JDEP
            ]
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlantillaRoutingModule { }