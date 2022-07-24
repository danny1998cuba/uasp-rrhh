import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { PLANTILLA_ROUTES } from 'src/app/data/constants';
import { Cargo, CatDoc, Cla, Departamento, DepsConsumer, NivelEscolar, Trabajador } from 'src/app/data/schema';
import { CargoService, CatDocService, CatOcupService, ClaService, DepartamentoService, EscalaService, NivelEscolarService, ReportsService, TrabajadorService } from 'src/app/data/services';
import { DepCargoService } from 'src/app/data/services/api/dep-cargo.service';
import { CargosComponent } from '../../sistema/cargos/cargos.component';
import { CatDocComponent } from '../../sistema/cat-doc/cat-doc.component';
import { ClaComponent } from '../../sistema/cla/cla.component';
import { NivelEscolarComponent } from '../../sistema/nivel-escolar/nivel-escolar.component';
import { FiltersSelectorComponent } from './filters-selector/filters-selector.component';

@Component({
  selector: 'app-trabajadores-filters',
  templateUrl: './trabajadores-filters.component.html',
  styleUrls: ['./trabajadores-filters.component.css']
})
export class TrabajadoresFiltersComponent implements OnInit {

  isLoading = false

  displayedColumns: string[] = ['nombre', 'ci', 'sexo', 'cargo'];
  dataSource = new MatTableDataSource<Trabajador>([]);
  faFilter = faFilter; faDown = faDownload

  catsDoc!: CatDoc[]
  clas!: Cla[]
  deps!: Departamento[]
  cargos!: Cargo[]
  niveles!: NivelEscolar[]

  listas: any
  lastFilter!: Trabajador

  //Components
  catDocComp!: CatDocComponent
  claComp!: ClaComponent
  depCons!: DepsConsumer
  cargoComp!: CargosComponent
  nivelesComp!: NivelEscolarComponent

  constructor(
    private service: TrabajadorService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private reportService: ReportsService,
    //Extra services
    catdocServ: CatDocService,
    catocupServ: CatOcupService,
    claServ: ClaService,
    cargoServ: CargoService,
    depServ: DepartamentoService,
    depCServ: DepCargoService,
    escService: EscalaService,
    nivelService: NivelEscolarService
  ) {
    this.catDocComp = new CatDocComponent(catdocServ, router, dialog, snackBar)
    this.claComp = new ClaComponent(claServ, router, dialog, snackBar)
    this.depCons = new DepsConsumer(depServ, router, snackBar)
    this.cargoComp = new CargosComponent(cargoServ, router, dialog, snackBar, escService, catocupServ, nivelService, depCServ, depServ)
    this.nivelesComp = new NivelEscolarComponent(nivelService, router, dialog, snackBar)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.catsDoc = this.catDocComp.data
      this.clas = this.claComp.data
      this.deps = this.depCons.data
      this.cargos = this.cargoComp.data
      this.niveles = this.nivelesComp.data

      this.listas = {
        catsDoc: this.catsDoc,
        clas: this.clas,
        deps: this.deps,
        cargos: this.cargos,
        niveles: this.niveles,
      }
    }, 1000);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(FiltersSelectorComponent, { data: { listas: this.listas } });
    bottomSheetRef.afterDismissed().subscribe((res) => {
      if (res) {
        if (res.success) {
          this.isLoading = true
          this.loadFilter(res.object)
        }
      }
    });
  }

  loadFilter(object: Trabajador) {
    this.lastFilter = object
    this.service.getByFilter(object).subscribe(
      r => {
        if (!r.error) {
          this.dataSource = new MatTableDataSource(r.data);
          setTimeout(() => this.isLoading = false, 1000)
        } else {
          this.sendMsg(r.msg)
        }
      }
    )
  }

  editTrabajador(object: Trabajador) {
    this.router.navigate(['/' + PLANTILLA_ROUTES.TRABAJADORES], {
      queryParams: { ci: object.ci }
    })
  }

  download() {
    this.reportService.filtered(this.lastFilter).subscribe(
      data => {
        var fileUrl = URL.createObjectURL(data.data)

        var a = document.createElement('a')
        a.href = fileUrl
        a.target = '_blank'
        a.download = 'Trabajadores filtrados.pdf'
        document.body.appendChild(a)
        a.click()
      }, (error) => {
        console.log(`error ${error}`)
      }
    )
  }

}
