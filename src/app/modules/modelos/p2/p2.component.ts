import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Unidad } from 'src/app/data/schema';
import { ReportsService, UnidadService } from 'src/app/data/services';
import { UnidadesComponent } from '../../sistema/unidades/unidades.component';

@Component({
  selector: 'app-p2',
  templateUrl: './p2.component.html',
  styleUrls: ['./p2.component.css']
})
export class P2Component implements OnInit {
  isLoading = false

  file: string = ''
  faDown = faDownload

  unidades!: Unidad[]
  unidad!: Unidad | null
  unidadComp!: UnidadesComponent

  constructor(
    unidadService: UnidadService,
    private router: Router,
    dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reportService: ReportsService
  ) {
    this.unidadComp = new UnidadesComponent(unidadService, router, dialog, snackBar)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.unidades = this.unidadComp.data
    }, 1000);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  changedUni() {
    this.isLoading = true
    if (this.unidad == null) {
      this.file = ''
      this.isLoading = false
    } else {
      this.reportService.p2(this.unidad.id).subscribe(
        r => {
          if (!r.error) {
            this.file = URL.createObjectURL(r.data)
          }
          else
            this.sendMsg("Error")
        }
      )
      setTimeout(() => { console.log(this.file); this.isLoading = false }, 1000);

    }
  }

}
