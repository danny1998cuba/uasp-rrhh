import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faEdit, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Escala, ServicesConsumer } from 'src/app/data/schema';
import { EscalaService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { EscalaAddModComponent } from './add-mod/add-mod.component';

@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.css']
})
export class EscalasComponent extends ServicesConsumer<Escala, number> {

  displayedColumns: string[] = ['id', 'clasificador', 'salario', 'actions'];
  dataSource = new MatTableDataSource<Escala>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: EscalaService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(service, router)
  }

  override refreshData() {
    this.service.getAll().subscribe(
      r => {
        if (!r.error) {
          this.data = r.data;
          this.dataSource = new MatTableDataSource(this.data);

          console.log(this.dataSource + '\n' + r.status)
          setTimeout(() => this.isLoading = false, 1000)
        } else {
          this.router.navigateByUrl('/home');
        }
      }
    )
  }

  override sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 2000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addModDialog(isMod: boolean, object?: Escala) {
    const myCompDialog = this.dialog.open(EscalaAddModComponent, { data: { isMod: isMod, object: object ? object : undefined } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Escala agregada correctamente')
          } else {
            this.mod(res.object, res.object.id)
            this.sendMsg('Escala modificada correctamente')
          }
        }
    });
  }

  delDialog(object: Escala) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'la escala salarial', class: object.clasificador } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
      }
    });
  }


}
