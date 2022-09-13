import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Nocturnidades, Trabajador, Unidad } from 'src/app/data/schema';
import { ReportsService, UnidadService } from 'src/app/data/services';
import { MonthPickerComponent } from 'src/app/shared/components';
import { UnidadesComponent } from '../../sistema/unidades/unidades.component';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  isLoading = false
  faDone = faCheck

  mes: string | null = 'Selección del mes'
  selectedMonth!: Date

  file: string = ''

  unidades!: Unidad[]
  unidad!: Unidad
  unidadComp!: UnidadesComponent

  @ViewChild('month') month !: MonthPickerComponent
  @ViewChild('stepper') stepper !: MatStepper
  @ViewChild('monthStep') monthStep !: MatStep

  constructor(
    private service: ReportsService,
    unidadService: UnidadService,
    router: Router,
    dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.unidadComp = new UnidadesComponent(unidadService, router, dialog, snackBar)
  }

  get monthControl() {
    return this.month ? this.month.form : new FormGroup({})
  }

  ngOnInit(): void {
    this.loadUnidades()
  }

  loadUnidades() {
    this.isLoading = true
    setTimeout(() => {
      this.unidades = this.unidadComp.data
      this.unidades.length != 0 ? this.unidad = this.unidades[0] : this.unidad = new Unidad()
      this.isLoading = false
    }, 1000);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  obtainMonth(date: Date) {
    this.selectedMonth = date
    this.monthStep.completed = true
    this.mes = new DatePipe('es-ES').transform(date, "MMMM YYYY")
    this.stepper.next()
  }

  async loadinfo(list: Trabajador[]) {
    this.isLoading = true
    this.stepper.next()
    let listado: Nocturnidades[] = list.map(t => {
      const n = new Nocturnidades
      n.idTrabajador = t
      n.fecha = this.selectedMonth
      n.cantidad = t.nocturnidades ? t.nocturnidades : 0
      return n
    })

    await firstValueFrom(this.service.database(this.selectedMonth, listado, this.unidad.id)).then(
      r => {
        if (!r.error) {
          this.file = URL.createObjectURL(r.data)
        } else {
          this.sendMsg('error')
        }
      }
    )

    this.isLoading = false
  }

  reset() {
    this.file = ''
    this.mes = 'Selección del mes'
    this.loadUnidades()
    this.stepper.reset()
  }
}
