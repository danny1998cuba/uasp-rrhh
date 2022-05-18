import { Component, OnInit } from '@angular/core';
import { MODELOS_SIDEBAR } from 'src/app/data/constants';

@Component({
  selector: 'app-modelo-skeleton',
  templateUrl: './modelo-skeleton.component.html',
  styleUrls: ['./modelo-skeleton.component.css']
})
export class ModeloSkeletonComponent {

  data = MODELOS_SIDEBAR

  constructor() { }

}
