import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cargo, Departamento, DepartamentoCargo, DepartamentoCargoPK, DepsConsumer, ServicesConsumer } from 'src/app/data/schema';
import { CargoService, CatOcupService, DepartamentoService, EscalaService, NivelEscolarService } from 'src/app/data/services';
import { DepCargoService } from 'src/app/data/services/api/dep-cargo.service';
import { DelDialogComponent } from 'src/app/shared/components';
import { CargosComponent } from '../cargos/cargos.component';
import { DcAddModComponent } from './dc-add-mod/dc-add-mod.component';

@Component({
  selector: 'app-dep-cargo',
  templateUrl: './dep-cargo.component.html',
  styleUrls: ['./dep-cargo.component.css']
})
export class DepCargoComponent extends ServicesConsumer<DepartamentoCargo, DepartamentoCargoPK> implements OnInit {

  displayedColumns: string[] = ['departamento', 'cargo', 'plazas', 'actions'];
  dataSource = new MatTableDataSource<DepartamentoCargo>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  deps!: Departamento[]
  cargos!: Cargo[]

  listas: any

  depCons!: DepsConsumer
  cargoComp!: CargosComponent

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: DepCargoService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    cargoServ: CargoService,
    depServ: DepartamentoService,
    escService: EscalaService,
    catocupServ: CatOcupService,
    nivelService: NivelEscolarService
  ) {
    super(service, router)
    this.depCons = new DepsConsumer(depServ, router, snackBar)
    this.cargoComp = new CargosComponent(cargoServ, router, dialog, snackBar, escService, catocupServ, nivelService)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.deps = this.depCons.data
      this.cargos = this.cargoComp.data

      this.listas = {
        deps: this.deps,
        cargos: this.cargos,
      }
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
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addModDialog(isMod: boolean, object?: DepartamentoCargo) {
    const myCompDialog = this.dialog.open(DcAddModComponent, { data: { isMod: isMod, object: object ? object : undefined, listas: this.listas } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Asignación agregada correctamente')
          } else {
            this.mod(res.object, { idDep: res.object.departamento.id, idCargo: res.object.cargo.id })
            this.sendMsg('Asignación modificada correctamente')
          }
        }
    });
  }

  delDialog(object: DepartamentoCargo) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'la asignación de plazas seleccionada', class: undefined } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del({ idDep: object.departamento.id, idCargo: object.cargo.id })
        this.sendMsg('Asignación eliminada correctamente')
      }
    });
  }


}
