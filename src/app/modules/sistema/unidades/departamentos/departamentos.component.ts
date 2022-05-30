import { Component, Input, OnInit } from '@angular/core';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Unidad } from 'src/app/data/schema';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  @Input() unidad!: Unidad
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  constructor() { }

  ngOnInit(): void {
  }

}
