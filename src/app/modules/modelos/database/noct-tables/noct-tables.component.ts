import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faMoon, faPencil } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Nocturnidades, Trabajador, Unidad } from 'src/app/data/schema';
import { NocturnidadesService, TrabajadorService } from 'src/app/data/services';
import { NoctFormComponent } from '../noct-form/noct-form.component';

@Component({
  selector: 'app-noct-tables',
  templateUrl: './noct-tables.component.html',
  styleUrls: ['./noct-tables.component.css']
})
export class NoctTablesComponent implements OnInit {

  @Output() submitEvent = new EventEmitter()
  @Input() unidad !: Unidad
  @Input() mes!: Date

  isLoading = true
  faMoon = faMoon; faEdit = faPencil

  trabs !: Trabajador[]
  noct: Trabajador[] = []

  displayedColumns: string[] = ['nombre', 'ci', 'cargo', 'actions'];
  displayedColumns2: string[] = ['nombre', 'ci', 'noct', 'actions'];

  dataSource = new MatTableDataSource<Trabajador>([]);
  dataSourceNoct = new MatTableDataSource<Trabajador>([]);

  @ViewChild('pag1') set matPaginator1(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild('pag2') set matPaginator2(paginator: MatPaginator) {
    this.dataSourceNoct.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  @ViewChild('filter1') filter1!: ElementRef;
  @ViewChild('filter2') filter2!: ElementRef;

  constructor(
    private service: TrabajadorService,
    private noctService: NocturnidadesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {

    let nocts: Nocturnidades[] = []

    await firstValueFrom(this.noctService.getByMonth(this.mes)).then(
      r => {
        if (!r.error) {
          nocts = r.data
        } else {
          this.sendMsg('Error')
        }
      }
    )

    await firstValueFrom(this.service.getAll()).then(
      r => {
        if (!r.error) {
          let aux: Trabajador[] = r.data

          nocts.forEach(
            noc => {
              let trab = aux.find(t => t.id == noc.idTrabajador.id)
              if (trab)
                trab.nocturnidades = noc.cantidad
            }
          )

          this.trabs = aux.filter(t =>
            t.idDepartamento.idUnidad.id == this.unidad.id
            && !t.nocturnidades)

          this.noct = aux.filter(t => t.idDepartamento.idUnidad.id == this.unidad.id
            && t.nocturnidades)

          this.updateDataSources()
        } else {
          this.sendMsg('Error')
        }
      }
    )
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  applyFilter(event: Event, string?: string) {
    let filterValue
    if (!string) {
      filterValue = (event.target as HTMLInputElement).value
    } else {
      filterValue = string
      this.filter1.nativeElement.value = filterValue
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterNocts(event: Event, string?: string) {
    let filterValue
    if (!string) {
      filterValue = (event.target as HTMLInputElement).value
    } else {
      filterValue = string
      this.filter2.nativeElement.value = filterValue
    }

    this.dataSourceNoct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceNoct.paginator) {
      this.dataSourceNoct.paginator.firstPage();
    }
  }

  addNoct(isMod: boolean, object: Trabajador) {
    const myCompDialog = this.dialog.open(NoctFormComponent, { data: { isMod: true, object: object ? object : undefined } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          const retObj = res.object as Trabajador

          if (isMod) {
            if (retObj.nocturnidades == 0) {
              this.noct = this.noct.filter(t => t.id != retObj.id)
              this.trabs.push(retObj)
              retObj.nocturnidades = undefined
            }
          } else {
            if (retObj.nocturnidades != 0) {
              this.trabs = this.trabs.filter(t => t.id != retObj.id)
              this.noct.push(retObj)
            }
          }

          this.updateDataSources()
        }
    });
  }

  private updateDataSources() {
    this.isLoading = true
    this.dataSource = new MatTableDataSource(this.trabs);
    this.dataSourceNoct = new MatTableDataSource(this.noct);
    setTimeout(() => { this.isLoading = false }, 500);
  }
}
