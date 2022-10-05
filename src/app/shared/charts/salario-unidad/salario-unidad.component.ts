import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { SalarioResult } from 'src/app/data/schema';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-salario-unidad',
  templateUrl: './salario-unidad.component.html',
  styleUrls: ['./salario-unidad.component.css']
})
export class SalarioUnidadComponent implements OnInit {

  @Input() salarios: SalarioResult[] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'pie';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return '$ ' + formatNumber(value, 'es-ES', '1.2-2');
        },
        color: '#333',
      },
    },
  }

  public chartData!: ChartData<'pie', number[], string | string[]>

  constructor() { }

  ngAfterViewInit(): void {
    this.chart?.update()
  }

  ngOnInit(): void {
    let labels: string[] = []
    let data: number[] = []

    this.salarios.forEach(s => {
      labels.push(s.unidad.nombre)
      data.push(s.salario)
    })

    this.chartData = {
      labels: labels,
      datasets: [{
        data: data
      }]
    };
  }

}
