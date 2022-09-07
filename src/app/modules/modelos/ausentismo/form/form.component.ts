import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatOcup } from 'src/app/data/schema';
import { CatOcupService } from 'src/app/data/services';

@Component({
  selector: 'app-ausentismo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class AusentismoFormComponent implements OnInit {

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
                autorizada: new FormControl(0, [Validators.min(0), Validators.required]),
                enfermedad: new FormControl(0, [Validators.min(0), Validators.required]),
                iss: new FormControl(0, [Validators.min(0), Validators.required]),
                accidente: new FormControl(0, [Validators.min(0), Validators.required]),
                injust: new FormControl(0, [Validators.min(0), Validators.required])
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
