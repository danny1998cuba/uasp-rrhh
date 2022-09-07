import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { MonthPickerComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-levantamiento',
  templateUrl: './levantamiento.component.html',
  styleUrls: ['./levantamiento.component.css']
})
export class LevantamientoComponent implements OnInit {

  faDone = faCheck

  mes: string | null = 'Selección del mes'

  @ViewChild('month') month !: MonthPickerComponent
  @ViewChild('stepper') stepper !: MatStepper
  @ViewChild('monthStep') monthStep !: MatStep

  constructor() { }

  get monthControl() {
    return this.month ? this.month.form : new FormGroup({})
  }

  ngOnInit(): void {
  }

  obtainMonth(date: Date) {
    this.stepper.next()
    this.monthStep.completed = true
    this.mes = new DatePipe('es-ES').transform(date, "MMMM YYYY")
  }

  loadinfo() {
    this.stepper.next()
  }

  reset() {
    this.mes = 'Selección del mes'
    this.stepper.reset()
  }

}
