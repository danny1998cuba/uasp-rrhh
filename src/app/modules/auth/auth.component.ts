import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  submitLogin() {
    this.authService.login(this.username, this.password).subscribe(
      r => {
        if (r.error) {
          alert('Error: ' + r.msg)
          // this.growl.data = { msg: r.msg, class: 'error', isHidden: false }
        }
      }
    )
  }

  restorrePass() {
    alert('You\'re going to restore the password')
  }

}
