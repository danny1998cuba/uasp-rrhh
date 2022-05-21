import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent {

  constructor(
    public dialogRef: MatDialogRef<DelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  yesDialog() {
    this.dialogRef.close({ event: 'yes-option' });
  }
  noDialog() {
    this.dialogRef.close({ event: 'no-option' });
  }
}
