import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cargo, CatOcup, Escala, NivelEscolar, ServicesConsumer } from 'src/app/data/schema';
import { CargoService, CatOcupService, EscalaService, NivelEscolarService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { CatOcupComponent } from '../cat-ocup/cat-ocup.component';
import { EscalasComponent } from '../escalas/escalas.component';
import { NivelEscolarComponent } from '../nivel-escolar/nivel-escolar.component';
import { CargoAddModComponent } from './add-mod/add-mod.component';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent extends ServicesConsumer<Cargo, number> implements OnInit {

  displayedColumns: string[] = ['nombre', 'nocturnidad', 'escala', 'actions'];
  dataSource = new MatTableDataSource<Cargo>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  escalas!: Escala[]
  catsOcup!: CatOcup[]
  niveles!: NivelEscolar[]

  listas: any

  escComp!: EscalasComponent
  catOcupComp!: CatOcupComponent
  nivelesComp!: NivelEscolarComponent

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
    escService: EscalaService,
    catocupServ: CatOcupService,
    nivelService: NivelEscolarService
  ) {
    super(service, router)

    this.escComp = new EscalasComponent(escService, router, dialog, snackBar)
    this.catOcupComp = new CatOcupComponent(catocupServ, router, dialog, snackBar)
    this.nivelesComp = new NivelEscolarComponent(nivelService, router, dialog, snackBar)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.escalas = this.escComp.data
      this.catsOcup = this.catOcupComp.data
      this.niveles = this.nivelesComp.data

      this.listas = {
        escalas: this.escalas,
        catsOcup: this.catsOcup,
        niveles: this.niveles
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

  addModDialog(isMod: boolean, object?: Cargo) {
    const myCompDialog = this.dialog.open(CargoAddModComponent, {
      data: {
        isMod: isMod,
        object: object ? object : undefined,
        listas: this.listas
      }
    });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Cargo agregado correctamente')
          } else {
            this.mod(res.object, res.object.id)
            this.sendMsg('Cargo modificado correctamente')
          }
        }
    });
  }

  delDialog(object: Cargo) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'el cargo', class: object.nombre } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
        this.sendMsg('Cargo eliminado correctamente')
      }
    });
  }
}
