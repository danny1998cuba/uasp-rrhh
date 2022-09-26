import { Component, OnInit } from '@angular/core';
import { evaluateRoles } from 'src/app/core/utils';
import { MODELOS_SIDEBAR } from 'src/app/data/constants';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent {

  data = MODELOS_SIDEBAR

  constructor() { }

  evaluateRoles(roles: string[]): boolean {
    return evaluateRoles(roles)
  }

}
