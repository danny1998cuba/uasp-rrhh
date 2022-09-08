import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Levantamiento } from 'src/app/data/schema';
import { MonthPickerComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-levantamiento',
  templateUrl: './levantamiento.component.html',
  styleUrls: ['./levantamiento.component.css']
})
export class LevantamientoComponent implements OnInit {

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
    this.monthStep.completed = true
    this.mes = new DatePipe('es-ES').transform(date, "MMMM YYYY")
    this.stepper.next()
  }

  loadinfo(levantamientos: Levantamiento[]) {
    console.log(levantamientos);
    this.stepper.next()
  }

  reset() {
    this.mes = 'Selección del mes'
    this.isLoading = true
    setTimeout(() => { this.isLoading = false }, 200);
    this.stepper.reset()
  }

}
