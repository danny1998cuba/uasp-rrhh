import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/data/services';

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
    private snackBar: MatSnackBar
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

  restorrePass() {
    alert('You\'re going to restore the password')
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top', })
  }

}
