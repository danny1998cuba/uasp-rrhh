import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Cargo, CatDoc, CatOcup, Cla, Departamento, DepsConsumer, NivelEscolar, ServicesConsumer, Trabajador } from 'src/app/data/schema';
import { CargoService, CatDocService, CatOcupService, ClaService, DepartamentoService, EscalaService, NivelEscolarService, TrabajadorService } from 'src/app/data/services';
import { DepCargoService } from 'src/app/data/services/api/dep-cargo.service';
import { DelDialogComponent } from 'src/app/shared/components';
import { FullNamePipe } from 'src/app/shared/pipes';
import { CargosComponent } from '../../sistema/cargos/cargos.component';
import { CatDocComponent } from '../../sistema/cat-doc/cat-doc.component';
import { CatOcupComponent } from '../../sistema/cat-ocup/cat-ocup.component';
import { ClaComponent } from '../../sistema/cla/cla.component';
import { NivelEscolarComponent } from '../../sistema/nivel-escolar/nivel-escolar.component';
import { TrabAddModComponent } from './trab-add-mod/trab-add-mod.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent extends ServicesConsumer<Trabajador, number> implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'ci', 'cargo', 'actions'];
  dataSource = new MatTableDataSource<Trabajador>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  //Arrays
  catsDoc!: CatDoc[]
  clas!: Cla[]
  deps!: Departamento[]
  cargos!: Cargo[]
  niveles!: NivelEscolar[]

  listas: any
  ci?: string

  //Components
  catDocComp!: CatDocComponent
  claComp!: ClaComponent
  depCons!: DepsConsumer
  cargoComp!: CargosComponent
  nivelesComp!: NivelEscolarComponent

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    service: TrabajadorService,
    router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    //Extra services
    catdocServ: CatDocService,
    catocupServ: CatOcupService,
    claServ: ClaService,
    cargoServ: CargoService,
    depServ: DepartamentoService,
    private depCServ: DepCargoService,
    escService: EscalaService,
    nivelService: NivelEscolarService
  ) {
    super(service, router)

    this.catDocComp = new CatDocComponent(catdocServ, router, dialog, snackBar)
    this.claComp = new ClaComponent(claServ, router, dialog, snackBar)
    this.depCons = new DepsConsumer(depServ, router, snackBar)
    this.cargoComp = new CargosComponent(cargoServ, router, dialog, snackBar, escService, catocupServ, nivelService, depCServ, depServ)
    this.nivelesComp = new NivelEscolarComponent(nivelService, router, dialog, snackBar)
  }

  ngAfterViewInit(): void {
    this.isLoading = true
    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.ci = params['ci']
        this.applyFilter(new Event(''), this.ci)
      })
      this.isLoading = false
    }, 100);
  }

  ngOnInit(): void {
    this.loadDatas()
  }

  async loadDatas() {
    await this.catDocComp.refreshData()
    this.catsDoc = this.catDocComp.data
    await this.claComp.refreshData()
    this.clas = this.claComp.data
    await this.depCons.refreshData()
    this.deps = this.depCons.data
    await this.cargoComp.refreshData()
    this.cargos = this.cargoComp.data
    await this.nivelesComp.refreshData()
    this.niveles = this.nivelesComp.data

    this.listas = {
      catsDoc: this.catsDoc,
      clas: this.clas,
      deps: this.deps,
      cargos: this.cargos,
      niveles: this.niveles,
    }
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
    // this.loadParameter()
    this.isLoading = false
  }

  override sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event, string?: string) {
    let filterValue
    if (!string) {
      filterValue = (event.target as HTMLInputElement).value
    } else {
      filterValue = string
      this.filter.nativeElement.value = filterValue
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addModDialog(isMod: boolean, object?: Trabajador) {
    const myCompDialog = this.dialog.open(TrabAddModComponent, { data: { isMod: isMod, object: object ? object : undefined, listas: this.listas, valid: this.depCServ } });
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
        this.sendMsg('Trabajador eliminado correctamente')
      }
    });
  }

}
