import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-restore-form',
  templateUrl: './restore-form.component.html',
  styleUrls: ['./restore-form.component.css']
})
export class RestoreFormComponent {
  ident: String = ''
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<RestoreFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.form = new FormGroup({
      ident: new FormControl(this.ident, Validators.required)
    })
  }

  closeDialog() {
    if (this.form.valid) {
      this.ident = this.form.get('ident')?.value

      this.dialogRef.close({ success: true, ident: this.ident });
    }
  }

}
