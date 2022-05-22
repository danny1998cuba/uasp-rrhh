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
import { InitComponent } from './init/init.component';  //Init section from module

//Add-mod components
import { EscalaAddModComponent } from './escalas/add-mod/add-mod.component';
import { CargoAddModComponent } from './cargos/add-mod/add-mod.component';
import { CDocAddModComponent } from './cat-doc/add-mod/add-mod.component';
import { COcupAddModComponent } from './cat-ocup/add-mod/add-mod.component';
import { ClaAddModComponent } from './cla/add-mod/add-mod.component';
import { UnidadAddModComponent } from './unidades/add-mod/add-mod.component';
import { UsuarioAddModComponent } from './usuarios/add-mod/add-mod.component';
import { RolAddModComponent } from './usuarios/rol-add-mod/rol-add-mod.component';


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
    InitComponent,

    //Add-mod components
    CargoAddModComponent,
    CDocAddModComponent,
    COcupAddModComponent,
    ClaAddModComponent,
    EscalaAddModComponent,
    UnidadAddModComponent,
    UsuarioAddModComponent,
    RolAddModComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
