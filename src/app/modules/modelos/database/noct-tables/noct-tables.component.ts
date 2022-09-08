import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faMoon, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Trabajador, Unidad } from 'src/app/data/schema';
import { TrabajadorService } from 'src/app/data/services';
import { NoctFormComponent } from '../noct-form/noct-form.component';

@Component({
  selector: 'app-noct-tables',
  templateUrl: './noct-tables.component.html',
  styleUrls: ['./noct-tables.component.css']
})
export class NoctTablesComponent implements OnInit {

  @Output() submitEvent = new EventEmitter()
  @Input() unidad !: Unidad

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

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private service: TrabajadorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      r => {
        if (!r.error) {
          let aux: Trabajador[] = r.data
          this.trabs = aux.filter(t => t.idDepartamento.idUnidad.id == this.unidad.id)

          // TODO Cargar nocturnidades almacenadas para el mes... Si existen...

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
      this.filter.nativeElement.value = filterValue
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  submit() {
    this.submitEvent.emit(this.noct)
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

              //delete relacion
            } else {
              //update relacion
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
    setTimeout(() => { this.isLoading = false }, 300);
  }
}
