import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Levantamiento } from 'src/app/data/schema';

@Component({
  selector: 'app-no-fisico-percent',
  templateUrl: './no-fisico-percent.component.html',
  styleUrls: ['./no-fisico-percent.component.css']
})
export class NoFisicoPercentComponent implements OnInit {

  @Input() levs: Levantamiento[] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'pie';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });

          if (value == 0) {
            return ''
          }

          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#000',
      },
    },
  }


  public chartData!: ChartData<'pie', number[], string | string[]>

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

    this.levs.forEach(l => {
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

    let labels: string[] = ['Madres', 'Aislamiento', 'COVID', 'No COVID', 'Peritados', 'Embarazo', 'Licencia de maternidad',
      'Otras licencias', 'Vacaciones', 'Interruptos']
    let data: number[] = [madres, aislamiento, covid, noCovid, peritados, embarazo, licMat, otraLic, vacaciones, interruptos]

    this.chartData = {
      labels: labels,
      datasets: [{
        data: data
      }]
    };
  }


}
