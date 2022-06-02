import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cargo, CatDoc, CatOcup, Cla, Departamento, DepsConsumer, ServicesConsumer, Trabajador } from 'src/app/data/schema';
import { CargoService, CatDocService, CatOcupService, ClaService, DepartamentoService, EscalaService, TrabajadorService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { FullNamePipe } from 'src/app/shared/pipes';
import { CargosComponent } from '../../sistema/cargos/cargos.component';
import { CatDocComponent } from '../../sistema/cat-doc/cat-doc.component';
import { CatOcupComponent } from '../../sistema/cat-ocup/cat-ocup.component';
import { ClaComponent } from '../../sistema/cla/cla.component';
import { TrabAddModComponent } from './trab-add-mod/trab-add-mod.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent extends ServicesConsumer<Trabajador, number> implements OnInit {

  displayedColumns: string[] = ['nombre', 'ci', 'cargo', 'actions'];
  dataSource = new MatTableDataSource<Trabajador>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  //Arrays
  catsDoc!: CatDoc[]
  catsOcup!: CatOcup[]
  clas!: Cla[]
  deps!: Departamento[]
  cargos!: Cargo[]

  listas: any

  //Components
  catDocComp!: CatDocComponent
  catOcupComp!: CatOcupComponent
  claComp!: ClaComponent
  depCons!: DepsConsumer
  cargoComp!: CargosComponent

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: TrabajadorService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    //Extra services
    catdocServ: CatDocService,
    catocupServ: CatOcupService,
    claServ: ClaService,
    cargoServ: CargoService,
    depServ: DepartamentoService,
    escService: EscalaService
  ) {
    super(service, router)

    this.catDocComp = new CatDocComponent(catdocServ, router, dialog, snackBar)
    this.catOcupComp = new CatOcupComponent(catocupServ, router, dialog, snackBar)
    this.claComp = new ClaComponent(claServ, router, dialog, snackBar)
    this.depCons = new DepsConsumer(depServ, router, snackBar)
    this.cargoComp = new CargosComponent(cargoServ, router, dialog, snackBar, escService)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.catsDoc = this.catDocComp.data
      this.catsOcup = this.catOcupComp.data
      this.clas = this.claComp.data
      this.deps = this.depCons.data
      this.cargos = this.cargoComp.data

      this.listas = {
        catsDoc: this.catsDoc,
        catsOcup: this.catsOcup,
        clas: this.clas,
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
    this.snackBar.open(msg, '', { duration: 2000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addModDialog(isMod: boolean, object?: Trabajador) {
    const myCompDialog = this.dialog.open(TrabAddModComponent, { data: { isMod: isMod, object: object ? object : undefined, listas: this.listas } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Trabajador agregado correctamente')
          } else {
            this.mod(res.object, res.object.id)
            this.sendMsg('Trabajador modificado correctamente')
          }
        }
    });
  }

  delDialog(object: Trabajador) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'el trabajador', class: new FullNamePipe().transform(object) } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
      }
    });
  }

}
