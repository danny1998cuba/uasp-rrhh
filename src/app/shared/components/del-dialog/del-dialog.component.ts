import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-del-dialog',
  templateUrl: './del-dialog.component.html',
  styleUrls: ['./del-dialog.component.css']
})
export class DelDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DelDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  yesDialog() {
    this.dialogRef.close({ event: 'yes-option' });
  }
  noDialog() {
    this.dialogRef.close({ event: 'no-option' });
  }

}
