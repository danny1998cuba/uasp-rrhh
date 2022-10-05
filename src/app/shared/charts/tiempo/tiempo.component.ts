import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { TiempoResult } from 'src/app/data/schema';
import { MonthPipe } from '../../pipes';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent implements OnInit {

  @Input() tiempo: TiempoResult[] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'line';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    elements: {
      line: {
        tension: 0.2
      }
    },
    responsive: true,
    plugins: {
      datalabels: {
        formatter(value, context) {
          return ''
        },
      },
    },
  }

  public chartData!: ChartData<'line', number[], string | string[]>

  constructor() { }

  ngAfterViewInit(): void {
    this.chart?.update()
  }

  ngOnInit(): void {
    let labels: string[] = []
    let mes: number[] = []
    let acumulado: number[] = []

    this.tiempo.forEach(s => {
      let mesLab = new MonthPipe().transform(s.mes - 1)
      labels.push(mesLab ? mesLab : '')
      mes.push(s.tiempoAct)
      acumulado.push(s.tiempoAcum)
    })

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: mes,
          label: 'Mes actual',
          fill: 'origin',
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.3)',
          pointBackgroundColor: 'red'
        },
        {
          data: acumulado,
          label: 'Acumulado',
          fill: 'origin',
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.3)',
          pointBackgroundColor: 'blue'
        }
      ]
    };
  }

}
