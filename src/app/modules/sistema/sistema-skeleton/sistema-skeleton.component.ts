import { Component, OnInit } from '@angular/core';
import { SISTEMA_SIDEBAR } from 'src/app/data/constants';

@Component({
  selector: 'app-sistema-skeleton',
  templateUrl: './sistema-skeleton.component.html',
  styleUrls: ['./sistema-skeleton.component.css']
})
export class SistemaSkeletonComponent {

  data = SISTEMA_SIDEBAR

  constructor() { }

}
