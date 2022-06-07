import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo, Departamento, DepartamentoCargo } from 'src/app/data/schema';

@Component({
  selector: 'app-dc-add-mod',
  templateUrl: './dc-add-mod.component.html',
  styleUrls: ['./dc-add-mod.component.css']
})
export class DcAddModComponent {

  object!: DepartamentoCargo
  form: FormGroup

  deps!: Departamento[]
  cargos!: Cargo[]

  constructor(
    public dialogRef: MatDialogRef<DcAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)

    this.deps = mydata.listas.deps
    this.cargos = mydata.listas.cargos

    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new DepartamentoCargo()
    }

    this.form = new FormGroup({
      departamento: new FormControl(this.object.departamento, Validators.required),
      cargo: new FormControl(this.object.cargo, Validators.required),
      plazas: new FormControl(this.object.plazas, [Validators.min(0), Validators.required]),
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.departamento = this.form.get('departamento')?.value
      this.object.cargo = this.form.get('cargo')?.value
      this.object.plazas = this.form.get('plazas')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

}
