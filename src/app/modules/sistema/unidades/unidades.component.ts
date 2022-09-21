import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { Departamento, ServicesConsumer, Unidad } from 'src/app/data/schema';
import { DepartamentoService, UnidadService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent extends ServicesConsumer<Unidad, number> {

  unidades!: Unidad[]
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  nombreUni: string = ''

  constructor(
    service: UnidadService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(service, router)
  }

  override async refreshData() {
    await firstValueFrom(this.service.getAll()).then(
      r => {
        if (!r.error) {
          this.data = r.data;
          this.unidades = this.data;
        } else {
          this.router.navigateByUrl('/home');
        }
      }
    )
    this.isLoading = false
  }

  override sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  addUni() {
    if (this.nombreUni.trim() != '') {
      let u: Unidad = {
        id: 0,
        nombre: this.nombreUni
      }
      this.add(u)

      this.nombreUni = ''
      this.sendMsg('Unidad agregada correctamente')
    } else {
      this.sendMsg('No se agregó la unidad pues debe proporcionar un nombre')
    }
  }

  modUni(obj: Unidad) {
    if (obj.nombre.trim() != '') {
      this.mod(obj, obj.id)

      this.sendMsg('Unidad modificada correctamente')
    } else {
      this.sendMsg('No se modificó la unidad pues debe proporcionar un nombre')
    }
  }

  delDialog(object: Unidad) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'la unidad', class: object.nombre } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
        this.sendMsg('Unidad eliminada correctamente')
      }
    });
  }

  refresh() {
    this.isLoading = true
    this.refreshData()
  }

}
