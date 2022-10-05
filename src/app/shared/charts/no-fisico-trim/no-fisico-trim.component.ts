import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Levantamiento } from 'src/app/data/schema';

@Component({
  selector: 'app-no-fisico-trim',
  templateUrl: './no-fisico-trim.component.html',
  styleUrls: ['./no-fisico-trim.component.css']
})
export class NoFisicoTrimComponent implements OnInit {

  @Input() levs: Levantamiento[][] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'bar';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter(value, context) {
          return ''
        },
        color: '#000',
      },
    },
  }


  public chartData!: ChartData<'bar', number[], string | string[]>

  constructor() { }

  ngAfterViewInit(): void {
    this.chart?.update()
  }

  ngOnInit(): void {
    let madres: number = 0
    let aislamiento: number = 0
    let covid: number = 0
    let noCovid: number = 0
    let peritados: number = 0
    let embarazo: number = 0
    let licMat: number = 0
    let otraLic: number = 0
    let vacaciones: number = 0
    let interruptos: number = 0

    let data: number[] = []
    let labels: string[] = ['Madres', 'Aislamiento', 'COVID', 'No COVID', 'Peritados', 'Embarazo', 'Licencia de maternidad',
      'Otras licencias', 'Vacaciones', 'Interruptos']

    this.chartData = {
      labels: labels,
      datasets: []
    };

    let date = new Date()
    this.levs.forEach(l1 => {
      // data.length = 0
      l1.forEach(l => {
        madres += l.madres
        aislamiento += l.aislamiento
        covid += l.covid
        noCovid += l.noCovid
        peritados += l.peritados
        embarazo += l.embarazo
        licMat += l.licMat
        otraLic += l.otraLic
        vacaciones += l.vacaciones
        interruptos += l.interruptos

      })
      data = [madres, aislamiento, covid, noCovid, peritados, embarazo, licMat, otraLic, vacaciones, interruptos]
      this.chartData.datasets.unshift({ data: data, label: formatDate(date, 'MMMM, yyyy', 'es-ES') })
      date.setMonth(date.getMonth() - 1)
    })
  }
}
