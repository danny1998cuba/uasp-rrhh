import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo, CatOcup, Escala, NivelEscolar } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class CargoAddModComponent {

  escalas!: Escala[]
  catsOcup!: CatOcup[]
  niveles!: NivelEscolar[]

  object!: Cargo
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CargoAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.escalas = mydata.listas.escalas
    this.catsOcup = mydata.listas.catsOcup
    this.niveles = mydata.listas.niveles

    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new Cargo()
      this.object.id = 0
    }

    this.form = new FormGroup({
      nombre: new FormControl({ value: this.object.nombre, disabled: this.mydata.isMod }, Validators.required),
      nocturnidad: new FormControl(this.object.nocturnidad, Validators.min(0)),
      escala: new FormControl(this.object.idEscala, Validators.required),
      catOcup: new FormControl(this.object.idCatOcup, Validators.required),
      nivelEscolar: new FormControl(this.object.idEscolarMin, Validators.required)
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.nocturnidad = this.form.get('nocturnidad')?.value
      this.object.idEscala = this.form.get('escala')?.value
      this.object.idCatOcup = this.form.get('catOcup')?.value
      this.object.idEscolarMin = this.form.get('nivelEscolar')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

}
