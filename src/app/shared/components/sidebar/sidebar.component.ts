import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { evaluateRoles } from 'src/app/core/utils';
import { ISidebarData } from './sidebar.metadata';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() data: ISidebarData = {
    icon: faUser,
    secionName: 'Section name',
    rootLink: '',
    groups: [
      {
        options: [
          {
            nombre: 'Default',
            link: '',
            roles: []
          }
        ]
      }
    ]
  }

  constructor() { }

  evaluateRoles(roles: string[]): boolean {
    return evaluateRoles(roles)
  }
}
