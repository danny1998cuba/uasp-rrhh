import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cargo, Escala, ServicesConsumer } from 'src/app/data/schema';
import { CargoService, EscalaService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { EscalasComponent } from '../escalas/escalas.component';
import { CargoAddModComponent } from './add-mod/add-mod.component';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent extends ServicesConsumer<Cargo, number> implements OnInit {

  displayedColumns: string[] = ['nombre', 'plazas', 'nocturnidad', 'escala', 'actions'];
  dataSource = new MatTableDataSource<Cargo>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  escComp!: EscalasComponent
  escalas!: Escala[]


  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: CargoService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    escService: EscalaService
  ) {
    super(service, router)
    this.escComp = new EscalasComponent(escService, router, dialog, snackBar)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.escalas = this.escComp.data
      console.log(this.escalas)
    }, 1000);
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

  addModDialog(isMod: boolean, object?: Cargo) {
    const myCompDialog = this.dialog.open(CargoAddModComponent, { data: { isMod: isMod, object: object ? object : undefined, escalas: this.escalas } });
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

  delDialog(object: Cargo) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'el cargo', class: object.nombre } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
      }
    });
  }
}
