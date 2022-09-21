import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ReportsService } from 'src/app/data/services';

@Component({
  selector: 'app-grupo-escala',
  templateUrl: './grupo-escala.component.html',
  styleUrls: ['./grupo-escala.component.css']
})
export class GrupoEscalaComponent implements OnInit {

  isLoading = true

  file: string = ''
  fecha: string = new Date().toLocaleDateString('es-ES')

  constructor(
    private reportService: ReportsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInfo()
  }

  async loadInfo() {
    await firstValueFrom(this.reportService.grupoEscala()).then(
      r => {
        if (!r.error) {
          this.file = URL.createObjectURL(r.data)
        }
        else
          this.sendMsg("Error")
      }
    )
    this.isLoading = false
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }
}
