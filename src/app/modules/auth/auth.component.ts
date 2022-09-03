import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/data/services';
import { RestoreFormComponent } from './restore-form/restore-form.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username: string = ''
  password: string = ''

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  submitLogin() {
    this.authService.login(this.username, this.password).subscribe(
      r => {
        if (r.error) {
          this.sendMsg(r.msg)
          this.username = ''
          this.password = ''
        }
      }
    )
  }

  restorePass() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = {
      top: '2rem'
    }
    dialogConfig.maxWidth = '40%'

    const myCompDialog = this.dialog.open(RestoreFormComponent, dialogConfig);
    myCompDialog.afterClosed().subscribe((res) => {
      if (res) {
        if (res.success) {
          this.authService.restorePass(res.ident).subscribe(
            r => {
              if (!r.error) {
                this.sendMsg(r.data.msg)
              } else {
                if (r.status == 404) {
                  this.sendMsg('No se encuentra el usuario proporcionado.')
                } else {
                  this.sendMsg(r.msg)
                }
              }
            });
        }
      }
    });
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top', })
  }

}
