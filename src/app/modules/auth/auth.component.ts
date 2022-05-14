import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string = ''
  password: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  submitLogin(){
    alert('Logged')
  }

  restorrePass(){
    alert('You\'re going to restore the password')
  }

}
