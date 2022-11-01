import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Authenticated } from 'src/app/core/utils';
import { PLANTILLA_ROUTES } from 'src/app/data/constants';
import { Trabajador } from 'src/app/data/schema';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Component({
  selector: 'app-clickable-trabajador-table',
  templateUrl: './clickable-trabajador-table.component.html',
  styleUrls: ['./clickable-trabajador-table.component.css']
})
export class ClickableTrabajadorTableComponent {

  @Input() dataSource!: MatTableDataSource<Trabajador>;
  displayedColumns: string[] = ['nombre', 'ci', 'sexo', 'cargo', 'actions'];
  isJDep = false
  faInfo = faInfo

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.isJDep = Authenticated.isJDep
  }

  editTrabajador(object: Trabajador) {
    if (Authenticated.isJDep) {
      this.router.navigate(['/' + PLANTILLA_ROUTES.TRABAJADORES], {
        queryParams: { ci: object.ci }
      })
    } else {
      this.sendMsg('No tiene permisos para modificar la información de los trabajadores')
    }

  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  inforDialog(object: Trabajador) {
    const myCompDialog = this.dialog.open(InfoDialogComponent, { data: { object: object ? object : undefined } });
  }

}
