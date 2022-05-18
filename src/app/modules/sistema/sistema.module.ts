import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { CargosComponent } from './cargos/cargos.component';
import { CatDocComponent } from './cat-doc/cat-doc.component';
import { CatOcupComponent } from './cat-ocup/cat-ocup.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EscalasComponent } from './escalas/escalas.component';
import { ClaComponent } from './cla/cla.component';
import { InitComponent } from './init/init.component';



@NgModule({
  declarations: [
    SistemaSkeletonComponent,
    UnidadesComponent,
    CargosComponent,
    CatDocComponent,
    CatOcupComponent,
    UsuariosComponent,
    EscalasComponent,
    ClaComponent,
    InitComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
