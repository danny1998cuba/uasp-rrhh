import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { REGEX_NOMBRE } from 'src/app/data/constants';
import { Cargo, CatDoc, Cla, Departamento, NivelEscolar, Trabajador } from 'src/app/data/schema';

@Component({
  selector: 'app-filters-selector',
  templateUrl: './filters-selector.component.html',
  styleUrls: ['./filters-selector.component.css']
})
export class FiltersSelectorComponent {

  object!: Trabajador
  form: FormGroup

  catsDoc!: CatDoc[]
  clas!: Cla[]
  deps!: Departamento[]
  cargos!: Cargo[]
  niveles!: NivelEscolar[]

  filteredNE!: NivelEscolar[]
  filteredD!: Departamento[]
  filteredC!: Cargo[]
  filteredCD!: CatDoc[]
  filteredCLA!: Cla[]

  @ViewChild("maestria") maestria!: MatCheckbox
  @ViewChild("doctorado") doctorado!: MatCheckbox
  @ViewChild("mision") mision!: MatCheckbox

  constructor(
    public selRef: MatBottomSheetRef<FiltersSelectorComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public mydata: any
  ) {
    if (mydata) {
      this.catsDoc = mydata.listas.catsDoc
      this.clas = mydata.listas.clas
      this.deps = mydata.listas.deps
      this.cargos = mydata.listas.cargos
      this.niveles = mydata.listas.niveles


      this.filteredNE = this.niveles.slice()
      this.filteredD = this.deps.slice()
      this.filteredC = this.cargos.slice()
      this.filteredCLA = this.clas.slice()
      this.filteredCD = this.catsDoc.slice()
    }

    this.object = new Trabajador()

    this.form = new FormGroup({
      nombre: new FormControl(this.object.nombre, Validators.pattern(REGEX_NOMBRE)),
      apellidos: new FormControl(this.object.apellidos, Validators.pattern(REGEX_NOMBRE)),
      ci: new FormControl(this.object.ci, Validators.pattern('[0-9]{11}')),
      sexo: new FormControl(this.object.sexo),
      maestria: new FormControl(this.object.maestria),
      doctorado: new FormControl(this.object.doctorado),
      mision: new FormControl(this.object.mision),
      idcatDoc: new FormControl(this.object.idCatDoc),
      nivelEscolar: new FormControl(this.object.idEscolar),
      idDepartamento: new FormControl(this.object.idDepartamento),
      idCLA: new FormControl(this.object.idCLA),
      idCargo: new FormControl(this.object.idCargo)
    })
  }


  submitDialog() {
    if (this.form.valid) {
      this.object.nombre = this.form.get('nombre')?.value
      this.object.apellidos = this.form.get('apellidos')?.value
      this.object.ci = this.form.get('ci')?.value
      this.object.sexo = this.form.get('sexo')?.value
      this.object.maestria = this.maestria.indeterminate ? undefined : this.form.get('maestria')?.value
      this.object.doctorado = this.doctorado.indeterminate ? undefined : this.form.get('doctorado')?.value
      this.object.mision = this.mision.indeterminate ? undefined : this.form.get('mision')?.value
      this.object.idCatDoc = this.form.get('idcatDoc')?.value
      this.object.idEscolar = this.form.get('nivelEscolar')?.value
      this.object.idDepartamento = this.form.get('idDepartamento')?.value
      this.object.idCLA = this.form.get('idCLA')?.value
      this.object.idCargo = this.form.get('idCargo')?.value

      this.selRef.dismiss({ success: true, object: this.object });
    }
  }

  cancel() {
    this.selRef.dismiss({ success: false, object: undefined });
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  onChange(ob: MatCheckboxChange) {
    if (ob.source.indeterminate) {
      ob.source.indeterminate = false
      ob.source.checked = true
    } else if (!ob.source.indeterminate && ob.checked) {
      ob.source.indeterminate = true
    }
  }
}
