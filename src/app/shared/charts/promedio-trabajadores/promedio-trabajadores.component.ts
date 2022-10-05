import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { PromResult } from 'src/app/data/schema';
import { MonthPipe } from '../../pipes';

@Component({
  selector: 'app-promedio-trabajadores',
  templateUrl: './promedio-trabajadores.component.html',
  styleUrls: ['./promedio-trabajadores.component.css']
})
export class PromedioTrabajadoresComponent implements OnInit {

  @Input() proms: PromResult[] = []

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
    let mes_muj: number[] = []
    let acumulado_muj: number[] = []

    this.proms.forEach(s => {
      let mesLab = new MonthPipe().transform(s.mes - 1)
      labels.push(mesLab ? mesLab : '')
      mes.push(s.promTotalAct)
      mes_muj.push(s.promMujeresAct)
      acumulado.push(s.promTotalAcum)
      acumulado_muj.push(s.promMujeresAcum)
    })

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: mes,
          label: 'Mes actual',
          fill: 'origin',
          borderColor: 'red',
          backgroundColor: 'transparent',
          pointBackgroundColor: 'red'
        },
        {
          data: mes_muj,
          label: 'Mes actual mujeres',
          fill: 'origin',
          borderColor: 'green',
          backgroundColor: 'transparent',
          pointBackgroundColor: 'green'
        },
        {
          data: acumulado,
          label: 'Acumulado',
          fill: 'origin',
          borderColor: 'blue',
          backgroundColor: 'transparent',
          pointBackgroundColor: 'blue'
        },
        {
          data: acumulado_muj,
          label: 'Acumulado mujeres',
          fill: 'origin',
          borderColor: 'yellow',
          backgroundColor: 'transparent',
          pointBackgroundColor: 'yellow'
        }
      ]
    };
  }


}
