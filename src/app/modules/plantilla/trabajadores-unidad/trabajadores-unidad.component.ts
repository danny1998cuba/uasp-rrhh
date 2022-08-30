import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { BaseChartDirective, NgChartsConfiguration } from 'ng2-charts';
import { Trabajador, Unidad } from 'src/app/data/schema';
import { CargoService, CatDocService, CatOcupService, ClaService, DepartamentoService, EscalaService, NivelEscolarService, ReportsService, TrabajadorService, UnidadService } from 'src/app/data/services';
import { DepCargoService } from 'src/app/data/services/api/dep-cargo.service';
import { PercentWomenComponent } from 'src/app/shared/charts';
import { UnidadesComponent } from '../../sistema/unidades/unidades.component';
import { TrabajadoresComponent } from '../trabajadores/trabajadores.component';

@Component({
  selector: 'app-trabajadores-unidad',
  templateUrl: './trabajadores-unidad.component.html',
  styleUrls: ['./trabajadores-unidad.component.css']
})
export class TrabajadoresUnidadComponent implements OnInit {

  isLoading = false
  allUnidsB = false

  dataSource = new MatTableDataSource<Trabajador>([]);
  dataSources: MatTableDataSource<Trabajador>[] = [];

  @ViewChild(PercentWomenComponent) chart: PercentWomenComponent | undefined;

  faDown = faDownload

  trabajadores!: Trabajador[]

  unidades!: Unidad[]
  unidad!: Unidad | null
  allUnids: Unidad = {
    id: 0,
    nombre: 'Todas las unidades'
  }

  downName = 'document.pdf'

  //Components
  unidadComp!: UnidadesComponent
  trabComp!: TrabajadoresComponent

  constructor(
    private service: TrabajadorService,
    private router: Router,
    dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reportService: ReportsService,
    //Extra services
    unidadService: UnidadService,
    catdocServ: CatDocService,
    catocupServ: CatOcupService,
    claServ: ClaService,
    cargoServ: CargoService,
    depServ: DepartamentoService,
    depCServ: DepCargoService,
    escService: EscalaService,
    nivelService: NivelEscolarService
  ) {
    this.unidadComp = new UnidadesComponent(unidadService, router, dialog, snackBar)
    this.trabComp = new TrabajadoresComponent(
      service, router, new ActivatedRoute(), dialog, snackBar, catdocServ,
      catocupServ, claServ, cargoServ, depServ, depCServ, escService, nivelService)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.unidades = this.unidadComp.data
      this.trabajadores = this.trabComp.data
    }, 1000);
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  compareObjects(ob1: any, ob2: any) { return (ob1 && ob2) ? ob1.id === ob2.id : false }

  changedUni() {
    this.isLoading = true
    if (this.unidad == null) {
      this.dataSource = new MatTableDataSource()
      this.isLoading = false
      this.allUnidsB = false
    } else if (this.unidad == this.allUnids) {
      this.allUnidsB = true

      this.unidades.forEach((uni, index) => {
        this.dataSources[index] = new MatTableDataSource(this.trabajadoresUnidad(uni))
      })
      this.changeTab(0)

      this.downName = 'Trabajadores - Todas las unidades.pdf'

      setTimeout(() => { this.isLoading = false }, 1000);
    } else {
      this.allUnidsB = false
      this.dataSource = new MatTableDataSource(this.trabajadoresUnidad(this.unidad))
      console.log(this.dataSource.data)

      this.downName = 'Trabajadores - ' + this.unidad.nombre + '.pdf' 

      setTimeout(() => { this.isLoading = false }, 1000);
    }
  }

  changeTab(index: number) {
    this.dataSource = this.dataSources[index]
  }

  trabajadoresUnidad(unidad: Unidad): Trabajador[] {
    console.log(this.trabajadores)
    return this.trabajadores.filter(trab => trab.idDepartamento.idUnidad.id == unidad.id)
  }

  download() {
    if (this.unidad) {
      this.reportService.unidades(this.unidad.id).subscribe(
        data => {
          var fileUrl = URL.createObjectURL(data.data)

          var a = document.createElement('a')
          a.href = fileUrl
          a.target = '_blank'

          a.download = this.downName
          document.body.appendChild(a)
          a.click()
        }, (error) => {
          console.log(`error ${error}`)
        }
      )
    }
  }

}
