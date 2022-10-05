import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { CatOcup } from 'src/app/data/schema';

@Component({
  selector: 'app-trab-catocup',
  templateUrl: './trab-catocup.component.html',
  styleUrls: ['./trab-catocup.component.css']
})
export class TrabCatocupComponent implements OnInit {

  @Input() trabajadorescatOcup: { catOcup: CatOcup, cantTrab: number, cantMujeres: number }[] = []

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

    this.trabajadorescatOcup.forEach(s => {
      labels.push(s.catOcup.nombre)
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
