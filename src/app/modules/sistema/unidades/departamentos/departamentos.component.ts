import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Departamento, DepsConsumer, ServicesConsumer, Unidad } from 'src/app/data/schema';
import { DepartamentoService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  @Input() unidad!: Unidad
  @Output() refresh = new EventEmitter()

  deps!: Departamento[]
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash
  depsConsumer: DepsConsumer
  nombreDep: string = ''

  constructor(
    private service: DepartamentoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.depsConsumer = new DepsConsumer(service, router, snackBar)
  }

  ngOnInit(): void {
    this.listDeps()
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  async listDeps() {
    await firstValueFrom(this.service.getByUnidad(this.unidad.id)).then(
      r => {
        if (!r.error) {
          this.deps = r.data;
        } else {
          this.router.navigateByUrl('/home');
        }
      }
    )
  }

  addDep() {
    if (this.nombreDep.trim() != '') {
      let u: Departamento = {
        id: 0,
        nombre: this.nombreDep,
        idUnidad: this.unidad
      }
      this.depsConsumer.add(u)

      this.nombreDep = ''
      this.sendMsg('Departamento agregado correctamente')
      this.refresh.emit()
    } else {
      this.sendMsg('No se agregó el departamento pues debe proporcionar un nombre')
    }
  }

  modDep(obj: Departamento) {
    if (obj.nombre.trim() != '') {
      this.depsConsumer.mod(obj, obj.id)

      this.sendMsg('Departamento modificado correctamente')
      this.refresh.emit()
    } else {
      this.sendMsg('No se modificó el departamento pues debe proporcionar un nombre')
    }
  }

  delDialog(object: Departamento) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'el departamento', class: object.nombre } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.depsConsumer.del(object.id)
        this.sendMsg('Departamento eliminado correctamente')
      }
    });
  }

}
