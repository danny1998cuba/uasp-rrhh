import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cOcupAbreviado } from 'src/app/core/validators';
import { CatOcup } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class COcupAddModComponent {

  object!: CatOcup
  form: FormGroup

  catsOcup!: CatOcup[]
  filtered!: CatOcup[]

  constructor(
    public dialogRef: MatDialogRef<COcupAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.catsOcup = mydata.catsOcup
    this.filtered = this.catsOcup.slice()

    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new CatOcup()
      this.object.id = 0
    }

    this.form = new FormGroup({
      nombre: new FormControl(this.object.nombre, Validators.required),
      abreviado: new FormControl(this.object.abreviado, Validators.required),
      parent: new FormControl(this.object.parent)
    }, {
      validators: [cOcupAbreviado()]
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.abreviado = this.form.get('abreviado')?.value
      this.object.parent = this.form.get('parent')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  parentChanged(object: CatOcup) {
    if (object != undefined) {
      this.form.get('abreviado')?.setValue(object.abreviado)
    } else {
      this.form.get('abreviado')?.setValue('')
    }
  }
}
