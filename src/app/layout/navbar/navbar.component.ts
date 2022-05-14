import { Component, OnInit } from '@angular/core';
import { faCog, faDashboard, faFile, faHome, faSignOut, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faHome = faHome; faUsers = faUsers; faFile = faFile; faCog = faCog
  faDash = faDashboard; faUser = faUser; faSign = faSignOut

  constructor() { }

  ngOnInit(): void {
  }

}
