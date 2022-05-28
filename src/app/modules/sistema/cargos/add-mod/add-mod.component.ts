import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo, Escala } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class CargoAddModComponent {

  escalas!: Escala[]
  object!: Cargo
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CargoAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    this.escalas = mydata.escalas
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new Cargo()
      this.object.id = 0
    }

    this.form = new FormGroup({
      nombre: new FormControl({ value: this.object.nombre, disabled: this.mydata.isMod }, Validators.required),
      plazas: new FormControl(this.object.plazas, [Validators.min(0), Validators.required]),
      nocturnidad: new FormControl(this.object.nocturnidad, Validators.min(0)),
      escala: new FormControl(this.object.idEscala, Validators.required),
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.plazas = this.form.get('plazas')?.value
      this.object.nocturnidad = this.form.get('nocturnidad')?.value
      this.object.idEscala = this.form.get('escala')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

}
