import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CatOcup, Levantamiento, PromResult, SalarioResult, TiempoResult, Trabajador, Unidad } from 'src/app/data/schema';
import { CatOcupService, LevantamientoService, StatsService, TrabajadorService, UnidadService } from 'src/app/data/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading = false
  salarios!: SalarioResult[]
  promedio!: PromResult[]
  tiempo!: TiempoResult[]
  trabajadores!: Trabajador[]
  mujeres!: Trabajador[]
  trabajadoresUnidad: { unidad: Unidad, cantTrab: number, cantMujeres: number }[] = []
  trabajadorescatOcup: { catOcup: CatOcup, cantTrab: number, cantMujeres: number }[] = []

  levantamientos!: Levantamiento[]
  levantamientosTrim: Levantamiento[][] = []
  fecha = new Date()

  constructor(
    private statsService: StatsService,
    private trabajadorService: TrabajadorService,
    private unidadService: UnidadService,
    private catOcupService: CatOcupService,
    private levService: LevantamientoService,
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
                cantTrab: this.trabajadores.filter(trab => trab.idDepartamento.idUnidad.id == u.id).length,
                cantMujeres: this.mujeres.filter(trab => trab.idDepartamento.idUnidad.id == u.id).length
              })
            }
          )
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.catOcupService.getRoots_Children(false)).then(
      r => {
        if (!r.error) {
          let catOcup: CatOcup[] = r.data
          catOcup.forEach(
            co => {
              this.trabajadorescatOcup.push({
                catOcup: co,
                cantTrab: this.trabajadores.filter(trab => trab.idCargo.idCatOcup.abreviado == co.abreviado).length,
                cantMujeres: this.mujeres.filter(trab => trab.idCargo.idCatOcup.abreviado == co.abreviado).length
              })
            }
          )
        } else {
          this.sendMsg('Error')
        }
      }
    )

    let date = new Date()
    for (let index = 0; index < 3; index++) {
      await firstValueFrom(this.levService.getByMonth(date)).then(
        r => {
          if (!r.error) {
            this.levantamientosTrim[index] = r.data

            if (index == 0) {
              this.levantamientos = r.data
            }
          } else {
            this.sendMsg('Error')
          }
        }
      )
      date.setMonth(date.getMonth() - 1)
    }

    this.isLoading = false
  }

  sumSalarios(): number {
    let sal = 0
    this.salarios.forEach(s => sal += s.salario)
    return sal
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }
}
