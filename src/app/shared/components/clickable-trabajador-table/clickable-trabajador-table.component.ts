import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PLANTILLA_ROUTES } from 'src/app/data/constants';
import { Trabajador } from 'src/app/data/schema';

@Component({
  selector: 'app-clickable-trabajador-table',
  templateUrl: './clickable-trabajador-table.component.html',
  styleUrls: ['./clickable-trabajador-table.component.css']
})
export class ClickableTrabajadorTableComponent {

  @Input() dataSource!: MatTableDataSource<Trabajador>;
  displayedColumns: string[] = ['nombre', 'ci', 'sexo', 'cargo'];

  
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }


  constructor(
    private router: Router
  ) { }

  editTrabajador(object: Trabajador) {
    this.router.navigate(['/' + PLANTILLA_ROUTES.TRABAJADORES], {
      queryParams: { ci: object.ci }
    })
  }

}
