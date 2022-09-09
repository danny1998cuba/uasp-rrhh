import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Ausencias } from 'src/app/data/schema';
import { ReportsService } from 'src/app/data/services';
import { MonthPickerComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-ausentismo',
  templateUrl: './ausentismo.component.html',
  styleUrls: ['./ausentismo.component.css']
})
export class AusentismoComponent implements OnInit {

  faDone = faCheck
  isLoading = true

  mes: string | null = 'Selección del mes'
  selectedMonth!: Date

  file: any

  @ViewChild('month') month !: MonthPickerComponent
  @ViewChild('stepper') stepper !: MatStepper
  @ViewChild('monthStep') monthStep !: MatStep

  constructor(
    private service: ReportsService,
    private snackBar: MatSnackBar
  ) { }

  get monthControl() {
    return this.month ? this.month.form : new FormGroup({})
  }

  ngOnInit(): void {
    setTimeout(() => { this.isLoading = false }, 200);
  }

  obtainMonth(date: Date) {
    this.selectedMonth = date
    this.mes = new DatePipe('es-ES').transform(date, "MMMM YYYY")
    this.monthStep.completed = true
    this.stepper.next()
  }

  async loadinfo(ausencias: Ausencias[]) {
    this.isLoading = true
    this.stepper.next()
    await firstValueFrom(this.service.ausentismo(this.selectedMonth, ausencias)).then(
      r => {
        if (!r.error) {
          this.file = r.data
        } else {
          this.sendMsg('error')
        }
      }
    )
    this.isLoading = false
  }

  reset() {
    this.mes = 'Selección del mes'
    this.isLoading = true
    setTimeout(() => { this.isLoading = false }, 200);
    this.stepper.reset()
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }
}
