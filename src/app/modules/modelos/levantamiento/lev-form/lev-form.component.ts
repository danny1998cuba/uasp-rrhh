import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatOcup } from 'src/app/data/schema';
import { CatOcupService } from 'src/app/data/services';

@Component({
  selector: 'app-lev-form',
  templateUrl: './lev-form.component.html',
  styleUrls: ['./lev-form.component.css']
})
export class LevFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter()

  isLoading = true

  forms: FormGroup[] = [];

  cats !: CatOcup[]

  constructor(
    private service: CatOcupService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.service.getRoots_Children(false).subscribe(
      r => {
        if (!r.error) {
          this.cats = r.data

          this.cats.forEach(
            cat => {
              this.forms.push(new FormGroup({
                categoria: new FormControl({ value: cat.nombre, disabled: true }),
                madres: new FormControl(0, [Validators.min(0), Validators.required]),
                aislamiento: new FormControl(0, [Validators.min(0), Validators.required]),
                covid: new FormControl(0, [Validators.min(0), Validators.required]),
                no_covid: new FormControl(0, [Validators.min(0), Validators.required]),
                peritados: new FormControl(0, [Validators.min(0), Validators.required]),
                embarazo: new FormControl(0, [Validators.min(0), Validators.required]),
                maternidad: new FormControl(0, [Validators.min(0), Validators.required]),
                licencia: new FormControl(0, [Validators.min(0), Validators.required]),
                vacaciones: new FormControl(0, [Validators.min(0), Validators.required]),
                interrupto: new FormControl(0, [Validators.min(0), Validators.required]),
                teletrab: new FormControl(0, [Validators.min(0), Validators.required]),
                pesquisa: new FormControl(0, [Validators.min(0), Validators.required]),
                vacunacion: new FormControl(0, [Validators.min(0), Validators.required]),
                otro_puesto: new FormControl(0, [Validators.min(0), Validators.required]),
              }))
            }
          )

          setTimeout(() => { this.isLoading = false }, 1000);
        } else {
          this.sendMsg('Error')
        }
      }
    )
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  submitAll() {
    let no_valid = this.forms.filter(f => !f.valid)
    if (no_valid.length == 0) {
      console.log('todo ok')
      this.submitEvent.emit()
    } else {
      this.sendMsg('El formulario presenta errores')
    }
  }

}
