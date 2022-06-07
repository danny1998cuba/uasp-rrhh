import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NivelEscolar } from 'src/app/data/schema';

@Component({
  selector: 'app-nivel-add-mod',
  templateUrl: './nivel-add-mod.component.html',
  styleUrls: ['./nivel-add-mod.component.css']
})
export class NivelAddModComponent {

  object!: NivelEscolar
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NivelAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new NivelEscolar()
      this.object.id = 0
    }

    this.form = new FormGroup({
      nombre: new FormControl({ value: this.object.nombre, disabled: this.mydata.isMod }, Validators.required),
      abreviado: new FormControl(this.object.abreviado, Validators.required),
      relevancia: new FormControl(this.object.relevancia, [Validators.min(0), Validators.required])
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.abreviado = this.form.get('abreviado')?.value
      this.object.relevancia = this.form.get('relevancia')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }


}
