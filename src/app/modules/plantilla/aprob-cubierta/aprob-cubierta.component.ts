import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportsService } from 'src/app/data/services';

@Component({
  selector: 'app-aprob-cubierta',
  templateUrl: './aprob-cubierta.component.html',
  styleUrls: ['./aprob-cubierta.component.css']
})
export class AprobCubiertaComponent implements OnInit {
  isLoading = true

  file: string = ''
  fecha: string = new Date().toLocaleDateString('es-ES')

  constructor(
    private reportService: ReportsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reportService.plantillaAC().subscribe(
      r => {
        if (!r.error) {
          this.file = URL.createObjectURL(r.data)
        }
        else
          this.sendMsg("Error")
      }
    )
    setTimeout(() => { this.isLoading = false }, 1500);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }
}
