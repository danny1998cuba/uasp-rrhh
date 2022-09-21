import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Authenticated } from 'src/app/core/utils';
import { passwordMatchValidator } from 'src/app/core/validators';
import { ROLES_PERMS, STORAGE_KEYS } from 'src/app/data/constants';
import { Usuario } from 'src/app/data/schema';
import { UserService } from 'src/app/data/services';
import { UsuarioAddModComponent } from '../sistema/usuarios/add-mod/add-mod.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {

  isLoading = false
  isLoadingPass = false

  usuario: Usuario
  faEdit = faPencil

  rolesPermis: String[] = []

  form: FormGroup

  constructor(
    private snackBar: MatSnackBar,
    private usService: UserService,
    private dialog: MatDialog
  ) {
    this.usuario = Authenticated.getUserFromLS ? Authenticated.getUserFromLS : new Usuario()

    this.form = new FormGroup({
      oldPass: new FormControl('', Validators.required),
      newPass: new FormControl('', Validators.required),
      newPass2: new FormControl('', Validators.required)
    }, [passwordMatchValidator()]);


    ROLES_PERMS.forEach(perm => {
      if (this.usuario.rolList.filter(r => r.nombre == perm.role).length != 0) {
        perm.perms.forEach(p => {
          if (!this.rolesPermis.includes(p)) {
            this.rolesPermis.push(p)
          }
        })
      }
    })
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  async changePass() {
    if (this.form.valid) {
      this.isLoadingPass = true
      let oldPass = this.form.get('oldPass')?.value
      let newPass = this.form.get('newPass')?.value

      await firstValueFrom(this.usService.changePass(this.usuario.id, oldPass, newPass)).then(
        r => {
          if (!r.error) {
            this.sendMsg(r.data)
          }
          else
            this.sendMsg(r.msg)
        }
      )
      this.form.reset()
      this.isLoadingPass = false
    }
  }

  edit() {
    const myCompDialog = this.dialog.open(UsuarioAddModComponent, { data: { isMod: true, object: this.usuario ? this.usuario : undefined, roles: [] } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          this.update(res.object)
        }
    });
  }

  async update(usuario: Usuario) {
    this.isLoading = true;
    await firstValueFrom(this.usService.update(usuario.id, usuario)).then(
      r => {
        if (r.status == HttpStatusCode.Ok) {
          this.sendMsg('Usuario modificado correctamente')
          this.setUserToLS(usuario)
        } else {
          this.sendMsg(r.msg)
        }
      }
    )
    this.isLoading = false
  }

  private setUserToLS(data: any) {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data))
  }

}
