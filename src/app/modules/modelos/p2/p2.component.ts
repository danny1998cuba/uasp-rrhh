import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
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
    this.loadUnidades()
  }

  async loadUnidades() {
    await this.unidadComp.refreshData()
    this.unidades = this.unidadComp.data
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  async changedUni() {
    this.isLoading = true
    if (this.unidad == null) {
      this.file = ''
      this.isLoading = false
    } else {
      await firstValueFrom(this.reportService.p2(this.unidad.id)).then(
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
  }
}


