import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { menorReferencia, menorReferenciaEach } from 'src/app/core/validators';
import { Ausencias, Cargo, CatOcup, Trabajador } from 'src/app/data/schema';
import { AusenciaService, CatOcupService, TrabajadorService } from 'src/app/data/services';

@Component({
  selector: 'app-ausentismo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class AusentismoFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter()
  @Input() mes!: Date

  isLoading = true

  forms: FormGroup[] = [];

  cats !: CatOcup[]

  constructor(
    private service: CatOcupService,
    private ausService: AusenciaService,
    private trabService: TrabajadorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    let ausencias: Ausencias[] = []

    await firstValueFrom(this.ausService.getByMonth(this.mes)).then(
      r => {
        if (!r.error) {
          ausencias = r.data
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

    for (const cat of this.cats) {
      const au_cat = ausencias.find(a => a.idcatOcup.id == cat.id)

      if (au_cat) {
        this.sendMsg('Ya existían datos del mes seleccionado')
      }

      let plantillaCub = 0
      let example = new Trabajador()
      example.idCargo = new Cargo()
      example.idCargo.idCatOcup = cat

      await firstValueFrom(this.trabService.countByFilter(example)).then(
        r => {
          if (!r.error) {
            plantillaCub = r.data
          } else {
            this.sendMsg('Error')
          }
        }
      )

      this.forms.push(new FormGroup({
        categoria: new FormControl({ value: cat, disabled: true }),
        referencia: new FormControl({ value: (plantillaCub * 24), disabled: true }),
        autorizada: new FormControl(
          au_cat ? au_cat.autorizado : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(plantillaCub * 24)]),
        enfermedad: new FormControl(
          au_cat ? au_cat.enfermedad : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(plantillaCub * 24)]),
        iss: new FormControl(
          au_cat ? au_cat.iss : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(plantillaCub * 24)]),
        accidente: new FormControl(
          au_cat ? au_cat.accidentes : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(plantillaCub * 24)]),
        injust: new FormControl(
          au_cat ? au_cat.injustificado : 0,
          [Validators.min(0), Validators.required, menorReferenciaEach(plantillaCub * 24)])
      },
        {
          validators: [menorReferencia()]
        }
      ))
    }

    setTimeout(() => { this.isLoading = false }, 1000);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  submitAll() {
    let no_valid = this.forms.filter(f => !f.valid)
    if (no_valid.length == 0) {
      const ausencias: Ausencias[] = []

      this.forms.forEach(
        form => {
          let ausencia = new Ausencias()

          ausencia.fecha = this.mes
          ausencia.idcatOcup = form.controls['categoria'].value

          ausencia.autorizado = form.controls['autorizada'].value
          ausencia.enfermedad = form.controls['enfermedad'].value
          ausencia.iss = form.controls['iss'].value
          ausencia.accidentes = form.controls['accidente'].value
          ausencia.injustificado = form.controls['injust'].value

          ausencias.push(ausencia)
        }
      )

      this.submitEvent.emit(ausencias.filter(au => {
        return au.autorizado != 0 || au.enfermedad != 0 || au.iss != 0 || au.accidentes != 0 || au.injustificado != 0
      }))
    } else {
      this.sendMsg('El formulario presenta errores')
    }
  }

}
