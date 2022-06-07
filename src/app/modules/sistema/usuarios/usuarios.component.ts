import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Authenticated } from 'src/app/core/utils';
import { Rol, RolConsumer, ServicesConsumer, Usuario } from 'src/app/data/schema';
import { RolService, UserService } from 'src/app/data/services';
import { DelDialogComponent } from 'src/app/shared/components';
import { UsuarioAddModComponent } from './add-mod/add-mod.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent extends ServicesConsumer<Usuario, number> implements OnInit {

  displayedColumns: string[] = ['nombre', 'username', 'roles', 'actions'];
  dataSource = new MatTableDataSource<Usuario>([]);
  faAdd = faPlus; faEdit = faPencil; faDelete = faTrash

  rolCons!: RolConsumer
  roles!: Rol[]


  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(
    service: UserService,
    router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    rolService: RolService
  ) {
    super(service, router)
    this.rolCons = new RolConsumer(rolService, router)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.roles = this.rolCons.data
      console.log(this.roles)
    }, 1000);
  }

  override refreshData() {
    this.service.getAll().subscribe(
      r => {
        if (!r.error) {
          this.data = r.data;
          this.dataSource = new MatTableDataSource(this.data);

          console.log(this.dataSource)
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

  addModDialog(isMod: boolean, object?: Usuario) {
    const myCompDialog = this.dialog.open(UsuarioAddModComponent, { data: { isMod: isMod, object: object ? object : undefined, roles: this.roles } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res)
        if (res.success) {
          if (!isMod) {
            this.add(res.object)
            this.sendMsg('Usuario agregado correctamente')
          } else {
            this.mod(res.object, res.object.id)
            this.sendMsg('Usuario modificado correctamente')
          }
        }
    });
  }

  delDialog(object: Usuario) {
    const myCompDialog = this.dialog.open(DelDialogComponent, { data: { text: 'el usuario', class: object.username } });
    myCompDialog.afterClosed().subscribe((res) => {
      if (res.event == 'yes-option') {
        this.del(object.id)
        this.sendMsg('Usuario eliminado correctamente')
      }
    });
  }

  amI(user: Usuario): boolean {
    let u = Authenticated.getUserFromLS
    return u ? u.id == user.id : false
  }
}
