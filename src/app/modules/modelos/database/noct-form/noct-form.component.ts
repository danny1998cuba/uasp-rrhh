import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trabajador } from 'src/app/data/schema';
import { FullNamePipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-noct-form',
  templateUrl: './noct-form.component.html',
  styleUrls: ['./noct-form.component.css']
})
export class NoctFormComponent {
  object!: Trabajador
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NoctFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.object = mydata.object

    this.form = new FormGroup({
      nombre: new FormControl({ value: new FullNamePipe().transform(this.object), disabled: true }),
      nocturnidad: new FormControl(this.object.nocturnidades ? this.object.nocturnidades : 0,
        [Validators.required, Validators.min(0), Validators.max(24)])
    });
  }

  closeDialog() {
    if (this.form.valid) {
      this.object.nocturnidades = this.form.get('nocturnidad')?.value

      this.dialogRef.close({ success: true, object: this.object });
    }
  }

}
