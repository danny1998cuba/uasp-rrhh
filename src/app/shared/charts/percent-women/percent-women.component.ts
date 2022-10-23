import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Trabajador } from 'src/app/data/schema';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { sum } from 'lodash';

@Component({
  selector: 'app-percent-women',
  templateUrl: './percent-women.component.html',
  styleUrls: ['./percent-women.component.css']
})
export class PercentWomenComponent implements OnInit, AfterViewInit {

  @Input() trabajadores: Trabajador[] = []

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartType: ChartType = 'pie';
  public chartPlugins = [DatalabelsPlugin];

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          if (value == 0) {
            return ''
          }

          let dataArr = ctx.chart.data.datasets[0].data;
          let total = sum(dataArr);     // sum from lodash        
          let percentage = (value * 100 / total).toFixed(2) + "%";
          return percentage;
        },
        color: '#fff',
      },
    },
  }


  public chartData!: ChartData<'pie', number[], string | string[]>

  constructor() { }

  ngAfterViewInit(): void {
    this.chart?.update()
  }

  ngOnInit(): void {
    const mujeres = this.trabajadores.filter(i => i.sexo == 'f').length

    this.chartData = {
      labels: ['Mujeres', 'Hombres'],
      datasets: [{
        data: [mujeres, this.trabajadores.length - mujeres]
      }]
    };
  }



}
