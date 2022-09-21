import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Authenticated } from 'src/app/core/utils';
import { REGEX_NOMBRE } from 'src/app/data/constants';
import { Rol, Usuario } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class UsuarioAddModComponent {

  roles!: Rol[]
  object!: Usuario
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<UsuarioAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    this.roles = mydata.roles
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new Usuario()
      this.object.id = 0
    }

    this.form = new FormGroup({
      username: new FormControl({ value: this.object.username, disabled: this.mydata.isMod }, Validators.required),
      password: new FormControl(this.object.password, Validators.required),
      nombre: new FormControl(this.object.nombre, [Validators.required, Validators.pattern(REGEX_NOMBRE)]),
      apellidos: new FormControl(this.object.apellidos, [Validators.required, Validators.pattern(REGEX_NOMBRE)]),
      email: new FormControl(this.object.email, [Validators.email, Validators.required]),
      telefono: new FormControl(this.object.telefono, Validators.pattern('[0-9]{8}')),
      enabled: new FormControl(this.object.enabled, Validators.required),
      rolList: new FormControl(this.object.rolList, Validators.required),
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.username = this.form.get('username')?.value
      this.object.password = this.form.get('password')?.value
      this.object.nombre = this.form.get('nombre')?.value
      this.object.apellidos = this.form.get('apellidos')?.value
      this.object.email = this.form.get('email')?.value
      this.object.telefono = this.form.get('telefono')?.value
      this.object.enabled = this.form.get('enabled')?.value
      this.object.rolList = this.form.get('rolList')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  amI(): boolean {
    if (this.object.id != 0) {
      let u = Authenticated.getUserFromLS
      return u ? u.id == this.object.id : false
    }
    return false
  }

}
