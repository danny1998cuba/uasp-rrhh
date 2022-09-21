import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Cla, ServicesConsumer } from 'src/app/data/schema';
import { ClaService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { ClaAddModComponent } from './add-mod/add-mod.component';

@Component({
  selector: 'app-cla',
  templateUrl: './cla.component.html',
  styleUrls: ['./cla.component.css']
})
export class ClaComponent extends ServicesConsumer<Cla, number>{

  displayedColumns: string[] = ['grupo', 'salario', 'actions'];
  dataSource = new MatTableDataSource<Cla>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: ClaService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(service, router)
  }

  override async refreshData() {
    await firstValueFrom(this.service.getAll()).then(
      r => {
        if (!r.error) {
          this.data = r.data;
          this.dataSource = new MatTableDataSource(this.data);
        } else {
          this.router.navigateByUrl('/home');
        }
      }
    )
    this.isLoading = false
  }

  override sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addModDialog(isMod: boolean, object?: Cla) {
    const myCompDialog = this.dialog.open(ClaAddModComponent, { data: { isMod: isMod, object: object ? object : undefined } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Condición agregada correctamente')
          } else {
            this.mod(res.object, res.object.id)
            this.sendMsg('Condición modificada correctamente')
          }
        }
    });
  }

  delDialog(object: Cla) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'la condición adicional del grupo ', class: object.grupo } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
        this.sendMsg('Condición eliminada correctamente')
      }
    });
  }


}
