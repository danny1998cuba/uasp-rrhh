import { Component, OnInit } from '@angular/core';
import { PLANTILLA_SIDEBAR } from 'src/app/data/constants';

@Component({
  selector: 'app-plantilla-skeleton',
  templateUrl: './plantilla-skeleton.component.html',
  styleUrls: ['./plantilla-skeleton.component.css']
})
export class PlantillaSkeletonComponent {
  data = PLANTILLA_SIDEBAR

  constructor() { }

}
