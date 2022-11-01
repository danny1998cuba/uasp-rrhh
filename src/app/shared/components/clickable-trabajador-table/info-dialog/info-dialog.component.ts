import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trabajador } from 'src/app/data/schema';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {
  object!: Trabajador

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) {
    this.object = mydata.object
  }

}
