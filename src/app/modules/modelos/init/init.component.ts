import { Component, OnInit } from '@angular/core';
import { MODELOS_SIDEBAR } from 'src/app/data/constants';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent {

  data = MODELOS_SIDEBAR

  constructor() { }

}
