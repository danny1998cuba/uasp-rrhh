import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo, CatDoc, CatOcup, Cla, Departamento, Trabajador } from 'src/app/data/schema';

@Component({
  selector: 'app-trab-add-mod',
  templateUrl: './trab-add-mod.component.html',
  styleUrls: ['./trab-add-mod.component.css']
})
export class TrabAddModComponent {

  object!: Trabajador
  form: FormGroup

  catsDoc!: CatDoc[]
  catsOcup!: CatOcup[]
  clas!: Cla[]
  deps!: Departamento[]
  cargos!: Cargo[]

  constructor(
    public dialogRef: MatDialogRef<TrabAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)

    this.catsDoc = mydata.listas.catsDoc
    this.catsOcup = mydata.listas.catsOcup
    this.clas = mydata.listas.clas
    this.deps = mydata.listas.deps
    this.cargos = mydata.listas.cargos

    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new Trabajador()
      this.object.id = 0
      this.object.maestria = false
      this.object.doctorado = false
    }

    this.form = new FormGroup({
      nombre: new FormControl(this.object.nombre, Validators.required),
      apellidos: new FormControl(this.object.apellidos, Validators.required),
      ci: new FormControl(this.object.ci, [Validators.pattern('[0-9]{11}'), Validators.required]),
      sexo: new FormControl(this.object.sexo, Validators.required),
      nivelEscolar: new FormControl(this.object.nivelEscolar, Validators.required),
      maestria: new FormControl(this.object.maestria, Validators.required),
      doctorado: new FormControl(this.object.doctorado, Validators.required),
      idcatOcup: new FormControl(this.object.idcatOcup, Validators.required),
      idcatDoc: new FormControl(this.object.idcatDoc),
      idDepartamento: new FormControl(this.object.idDepartamento, Validators.required),
      idCLA: new FormControl(this.object.idCLA),
      idCargo: new FormControl(this.object.idCargo, Validators.required)
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.apellidos = this.form.get('apellidos')?.value
      this.object.ci = this.form.get('ci')?.value
      this.object.sexo = this.form.get('sexo')?.value
      this.object.nivelEscolar = this.form.get('nivelEscolar')?.value
      this.object.maestria = this.form.get('maestria')?.value
      this.object.doctorado = this.form.get('doctorado')?.value
      this.object.idcatOcup = this.form.get('idcatOcup')?.value
      this.object.idcatDoc = this.form.get('idcatDoc')?.value
      this.object.idDepartamento = this.form.get('idDepartamento')?.value
      this.object.idCLA = this.form.get('idCLA')?.value
      this.object.idCargo = this.form.get('idCargo')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

}
