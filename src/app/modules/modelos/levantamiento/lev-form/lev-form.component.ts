import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { cantidadMujeres, menorReferencia, menorReferenciaEach, mujeresNF } from 'src/app/core/validators';
import { Cargo, CatOcup, Levantamiento, Trabajador } from 'src/app/data/schema';
import { CatOcupService, LevantamientoService, TrabajadorService } from 'src/app/data/services';

@Component({
  selector: 'app-lev-form',
  templateUrl: './lev-form.component.html',
  styleUrls: ['./lev-form.component.css']
})
export class LevFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter()
  @Input() mes!: Date

  isLoading = true

  forms: FormGroup[] = [];

  cats !: CatOcup[]

  constructor(
    private service: CatOcupService,
    private levService: LevantamientoService,
    private trabService: TrabajadorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    let levs: Levantamiento[] = []

    await firstValueFrom(this.levService.getByMonth(this.mes)).then(
      r => {
        if (!r.error) {
          levs = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.service.getRoots_Children(false)).then(
      r => {
        if (!r.error) {
          this.cats = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    if (levs.length != 0) {
      this.sendMsg('Ya existían datos del mes seleccionado')
    }

    for (const cat of this.cats) {
      const lev_cat = levs.find(a => a.idcatOcup.id == cat.id)

      let realDisponible = 0
      let example = new Trabajador()
      example.idCargo = new Cargo()
      example.idCargo.idCatOcup = cat
      example.mision = false

      await firstValueFrom(this.trabService.countByFilter(example)).then(
        r => {
          if (!r.error) {
            realDisponible = r.data
          } else {
            this.sendMsg('Error')
          }
        }
      )

      this.forms.push(new FormGroup({
        categoria: new FormControl({ value: cat, disabled: true }),
        referencia: new FormControl({ value: realDisponible, disabled: true }),
        madres: new FormControl(
          lev_cat ? lev_cat.madres : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        aislamiento: new FormControl(
          lev_cat ? lev_cat.aislamiento : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        covid: new FormControl(
          lev_cat ? lev_cat.covid : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        no_covid: new FormControl(
          lev_cat ? lev_cat.noCovid : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        peritados: new FormControl(
          lev_cat ? lev_cat.peritados : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        embarazo: new FormControl(
          lev_cat ? lev_cat.embarazo : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        maternidad: new FormControl(
          lev_cat ? lev_cat.licMat : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        licencia: new FormControl(
          lev_cat ? lev_cat.otraLic : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        vacaciones: new FormControl(
          lev_cat ? lev_cat.vacaciones : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        interrupto: new FormControl(
          lev_cat ? lev_cat.interruptos : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        teletrab: new FormControl(
          lev_cat ? lev_cat.teletrabajo : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        pesquisa: new FormControl(
          lev_cat ? lev_cat.pesquisa : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        vacunacion: new FormControl(
          lev_cat ? lev_cat.vacunacion : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        otro_puesto: new FormControl(
          lev_cat ? lev_cat.otroPuesto : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible)]),
        mujeresNF: new FormControl(
          lev_cat ? lev_cat.totalMujeresNoFisico : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(realDisponible),
          cantidadMujeres(this.trabService, cat.abreviado)]),
      },
        {
          validators: [menorReferencia(), mujeresNF()]
        }
      ))
    }

    this.isLoading = false
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  submitAll() {
    let no_valid = this.forms.filter(f => !f.valid)

    if (no_valid.length == 0) {
      const levant: Levantamiento[] = []

      this.forms.forEach(
        form => {
          let lev = new Levantamiento()

          lev.fecha = this.mes
          lev.idcatOcup = form.controls['categoria'].value

          lev.madres = form.controls['madres'].value
          lev.aislamiento = form.controls['aislamiento'].value
          lev.covid = form.controls['covid'].value
          lev.noCovid = form.controls['no_covid'].value
          lev.peritados = form.controls['peritados'].value
          lev.embarazo = form.controls['embarazo'].value
          lev.licMat = form.controls['maternidad'].value
          lev.otraLic = form.controls['licencia'].value
          lev.vacaciones = form.controls['vacaciones'].value
          lev.interruptos = form.controls['interrupto'].value
          lev.teletrabajo = form.controls['teletrab'].value
          lev.pesquisa = form.controls['pesquisa'].value
          lev.vacunacion = form.controls['vacunacion'].value
          lev.otroPuesto = form.controls['otro_puesto'].value
          lev.totalMujeresNoFisico = form.controls['mujeresNF'].value

          levant.push(lev)
        }
      )

      this.submitEvent.emit(levant.filter(lev => {
        return lev.madres != 0 || lev.aislamiento != 0 || lev.covid != 0 ||
          lev.noCovid != 0 || lev.peritados != 0 || lev.embarazo != 0 ||
          lev.licMat != 0 || lev.otraLic != 0 || lev.vacaciones != 0 ||
          lev.interruptos != 0 || lev.teletrabajo != 0 || lev.pesquisa != 0 ||
          lev.vacunacion != 0 || lev.otroPuesto != 0
      }))
    } else {
      this.sendMsg('El formulario presenta errores')
    }
  }

}
