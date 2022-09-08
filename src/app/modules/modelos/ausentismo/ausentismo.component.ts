import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Ausencias } from 'src/app/data/schema';
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

  @ViewChild('month') month !: MonthPickerComponent
  @ViewChild('stepper') stepper !: MatStepper
  @ViewChild('monthStep') monthStep !: MatStep

  constructor() { }

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

  loadinfo(ausencias: Ausencias[]) {
    console.log(ausencias);
    this.stepper.next()
  }

  reset() {
    this.mes = 'Selección del mes'
    this.isLoading = true
    setTimeout(() => { this.isLoading = false }, 200);
    this.stepper.reset()
  }
}
