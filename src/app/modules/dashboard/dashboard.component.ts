import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { PromResult, SalarioResult, TiempoResult, Trabajador, Unidad } from 'src/app/data/schema';
import { StatsService, TrabajadorService, UnidadService } from 'src/app/data/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading = false
  salarios!: SalarioResult
  promedio!: PromResult
  tiempo!: TiempoResult
  trabajadores!: Trabajador[]
  mujeres!: Trabajador[]
  trabajadoresUnidad: { unidad: Unidad, cantTrab: number }[] = []

  constructor(
    private statsService: StatsService,
    private trabajadorService: TrabajadorService,
    private unidadService: UnidadService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.isLoading = true

    await firstValueFrom(this.statsService.promedio()).then(
      r => {
        if (!r.error) {
          this.promedio = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.statsService.tiempo()).then(
      r => {
        if (!r.error) {
          this.tiempo = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.statsService.salario()).then(
      r => {
        if (!r.error) {
          this.salarios = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.trabajadorService.getAll()).then(
      r => {
        if (!r.error) {
          this.trabajadores = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    this.mujeres = this.trabajadores.filter(t => t.sexo == 'f')

    await firstValueFrom(this.unidadService.getAll()).then(
      r => {
        if (!r.error) {
          let unidades: Unidad[] = r.data
          unidades.forEach(
            u => {
              this.trabajadoresUnidad.push({
                unidad: u,
                cantTrab: this.trabajadores.filter(trab => trab.idDepartamento.idUnidad.id == u.id).length
              })
            }
          )
        } else {
          this.sendMsg('Error')
        }
      }
    )

    this.isLoading = false
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }
}
