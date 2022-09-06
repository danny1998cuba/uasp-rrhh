import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/guards';
import { MODELOS_ROOT, PLANTILLA_ROOT, SESION_ROOT, SISTEMA_ROOT } from './data/constants';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { AuthComponent } from './modules/auth/auth.component';
import { SesionComponent } from './modules/sesion/sesion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    component: SkeletonComponent,
    children: [
      {
        path: MODELOS_ROOT,
        loadChildren: () =>
          import('./modules/modelos/modelos.module').then((m) => m.ModelosModule)
      },
      {
        path: PLANTILLA_ROOT,
        loadChildren: () =>
          import('./modules/plantilla/plantilla.module').then((m) => m.PlantillaModule)
      },
      {
        path: SISTEMA_ROOT,
        loadChildren: () =>
          import('./modules/sistema/sistema.module').then((m) => m.SistemaModule)
      },
      {
        path: SESION_ROOT,
        component: SesionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: `/${MODELOS_ROOT}`,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
