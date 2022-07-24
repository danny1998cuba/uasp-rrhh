import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo, Departamento, DepartamentoCargo, DepartamentoCargoPK } from 'src/app/data/schema';
import { DepCargoService } from 'src/app/data/services/api/dep-cargo.service';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: ['./asign.component.css']
})
export class AsignComponent {

  object!: DepartamentoCargo
  form: FormGroup

  deps!: Departamento[]
  cargo!: Cargo

  exists = false
  plazas: FormControl;

  constructor(
    public dialogRef: MatDialogRef<AsignComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,
    private depCServ: DepCargoService
  ) {
    this.deps = mydata.listas.deps
    this.cargo = mydata.cargo

    this.plazas = new FormControl(0, [Validators.min(0), Validators.required])

    this.form = new FormGroup({
      departamento: new FormControl(Validators.required),
      cargo: new FormControl({ value: this.cargo.nombre, disabled: true }, Validators.required),
      plazas: this.plazas,
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object = new DepartamentoCargo()

      this.object.departamento = this.form.get('departamento')?.value
      this.object.cargo = this.cargo
      this.object.plazas = this.form.get('plazas')?.value

      this.dialogRef.close({ success: true, object: this.object, exists: this.exists });
    }
  }

  onChange(dep: Departamento) {
    if (dep == undefined) {
      this.plazas.setValue(0)
      this.exists = false
    } else {
      let pk = new DepartamentoCargoPK;
      pk.idCargo = this.cargo.id
      pk.idDep = dep.id

      this.depCServ.getByIdAsync(pk).then(v => {
        if (!v.error) {
          this.plazas.setValue(v.data.plazas)
          this.exists = true
        } else if (v.status == 404) {
          this.plazas.setValue(0)
          this.exists = false
        }
      })
    }
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

}
