import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Unidad } from 'src/app/data/schema';

@Component({
  selector: 'app-trabajador-unidad',
  templateUrl: './trabajador-unidad.component.html',
  styleUrls: ['./trabajador-unidad.component.css']
})
export class TrabajadorUnidadComponent implements OnInit {

  @Input() trabajadoresUnidad: { unidad: Unidad, cantTrab: number, cantMujeres: number }[] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'bar';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#fff',
      },
    },
  }


  public chartData!: ChartData<'bar', number[], string | string[]>

  constructor() { }

  ngAfterViewInit(): void {
    this.chart?.update()
  }

  ngOnInit(): void {
    let labels: string[] = []
    let data: number[] = []
    let mujeres: number[] = []

    this.trabajadoresUnidad.forEach(s => {
      labels.push(s.unidad.nombre)
      data.push(s.cantTrab)
      mujeres.push(s.cantMujeres)
    })

    this.chartData = {
      labels: labels,
      datasets: [
        { data: data, label: 'Total' },
        { data: mujeres, label: 'Mujeres' }
      ]
    };
  }


}
