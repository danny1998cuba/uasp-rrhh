import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Trabajador } from 'src/app/data/schema';
import { TrabajadorService } from 'src/app/data/services';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent {

  trabajadores: any
  mujeres: any

  constructor(
    private service: TrabajadorService
  ) {
    let example = new Trabajador()
    this.counts(example).then(r => this.trabajadores = r.data)

    example.sexo = 'f'
    this.counts(example).then(r => this.mujeres = r.data)
    example = new Trabajador()
  }

  async counts(example: Trabajador) {
    const call = this.service.countByFilter(example)
    return await lastValueFrom(call)
  }

}
