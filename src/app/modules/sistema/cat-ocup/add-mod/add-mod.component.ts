import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatOcup } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class COcupAddModComponent {

  object!: CatOcup
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<COcupAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new CatOcup()
      this.object.id = 0
    }

    this.form = new FormGroup({
      nombre: new FormControl(this.object.nombre, Validators.required),
      abreviado: new FormControl(this.object.abreviado, Validators.required)
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.abreviado = this.form.get('abreviado')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

}
