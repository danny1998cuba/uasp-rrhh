import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SistemaRoutingModule } from './sistema-routing.module';

//Module skeleton
import { SistemaSkeletonComponent } from './sistema-skeleton/sistema-skeleton.component';

//Base components
import { UnidadesComponent } from './unidades/unidades.component';
import { CargosComponent } from './cargos/cargos.component';
import { CatDocComponent } from './cat-doc/cat-doc.component';
import { CatOcupComponent } from './cat-ocup/cat-ocup.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EscalasComponent } from './escalas/escalas.component';
import { ClaComponent } from './cla/cla.component';
import { DepartamentosComponent } from './unidades/departamentos/departamentos.component';
import { NivelEscolarComponent } from './nivel-escolar/nivel-escolar.component';
import { DepCargoComponent } from './dep-cargo/dep-cargo.component';
import { InitComponent } from './init/init.component';  //Init section from module

//Add-mod components
import { EscalaAddModComponent } from './escalas/add-mod/add-mod.component';
import { CargoAddModComponent } from './cargos/add-mod/add-mod.component';
import { CDocAddModComponent } from './cat-doc/add-mod/add-mod.component';
import { COcupAddModComponent } from './cat-ocup/add-mod/add-mod.component';
import { ClaAddModComponent } from './cla/add-mod/add-mod.component';
import { UsuarioAddModComponent } from './usuarios/add-mod/add-mod.component';
import { NivelAddModComponent } from './nivel-escolar/nivel-add-mod/nivel-add-mod.component';
import { DcAddModComponent } from './dep-cargo/dc-add-mod/dc-add-mod.component';


@NgModule({
  declarations: [
    //Module skeleton
    SistemaSkeletonComponent,

    //Base components
    UnidadesComponent,
    CargosComponent,
    CatDocComponent,
    CatOcupComponent,
    UsuariosComponent,
    EscalasComponent,
    ClaComponent,
    DepartamentosComponent,
    NivelEscolarComponent,
    DepCargoComponent,
    InitComponent,

    //Add-mod components
    CargoAddModComponent,
    CDocAddModComponent,
    COcupAddModComponent,
    ClaAddModComponent,
    EscalaAddModComponent,
    UsuarioAddModComponent,
    NivelAddModComponent,
    DcAddModComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
