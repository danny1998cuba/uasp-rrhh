import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { evaluateRoles } from 'src/app/core/utils';
import { PLANTILLA_SIDEBAR } from 'src/app/data/constants';
import { Trabajador } from 'src/app/data/schema';
import { TrabajadorService } from 'src/app/data/services';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  data = PLANTILLA_SIDEBAR
  list!: Trabajador[]
  mujeres!: Trabajador[]

  constructor(
    private service: TrabajadorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInfo()
  }

  async loadInfo() {
    await firstValueFrom(this.service.getAll()).then(
      r => {
        if (!r.error) {
          this.list = r.data
        } else {
          this.sendMsg(r.msg)
        }
      }
    )

    this.mujeres = this.list.filter(t => t.sexo == 'f')
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  evaluateRoles(roles: string[]): boolean {
    return evaluateRoles(roles)
  }
}
