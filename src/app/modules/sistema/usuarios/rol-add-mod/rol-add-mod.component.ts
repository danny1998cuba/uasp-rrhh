import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/data/schema';

@Component({
  selector: 'app-rol-add-mod',
  templateUrl: './rol-add-mod.component.html',
  styleUrls: ['./rol-add-mod.component.css']
})
export class RolAddModComponent {

  object!: Rol
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<RolAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new Rol()
      this.object.id = 0
    }

    this.form = new FormGroup({
      // clasificador: new FormControl({ value: this.object.clasificador, disabled: this.mydata.isMod }, Validators.required),
      // salario: new FormControl(this.object.salario, [Validators.min(0), Validators.required])
    })
  }

  closeDialog() {
    if (this.form.valid) {
      // this.object.clasificador = this.form.get('clasificador')?.value
      // this.object.salario = this.form.get('salario')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

}
