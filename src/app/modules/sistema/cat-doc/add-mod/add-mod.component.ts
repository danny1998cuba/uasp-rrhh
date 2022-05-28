import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatDoc } from 'src/app/data/schema';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class CDocAddModComponent {

  object!: CatDoc
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CDocAddModComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    console.log(mydata)
    if (mydata.isMod) {
      this.object = mydata.object
    } else {
      this.object = new CatDoc()
      this.object.id = 0
    }

    this.form = new FormGroup({
      tipo: new FormControl({ value: this.object.tipo, disabled: this.mydata.isMod }, Validators.required),
      salario: new FormControl(this.object.salario, [Validators.min(0), Validators.required])
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.tipo = this.form.get('tipo')?.value
      this.object.salario = this.form.get('salario')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

}
