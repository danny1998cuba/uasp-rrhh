import { Component, OnInit } from '@angular/core';
import { faCog, faDashboard, faFile, faHome, faSignOut, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MODELOS_ROOT, PLANTILLA_ROOT, SESION_ROOT, SISTEMA_ROOT, SITE_ROOT } from 'src/app/data/constants';
import { AuthService } from 'src/app/data/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faHome = faHome; faUsers = faUsers; faFile = faFile; faCog = faCog
  faDash = faDashboard; faUser = faUser; faSign = faSignOut

  plantilla = PLANTILLA_ROOT; modelos = MODELOS_ROOT; sistema = SISTEMA_ROOT; sesion = SESION_ROOT; dash = SITE_ROOT

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }
}
