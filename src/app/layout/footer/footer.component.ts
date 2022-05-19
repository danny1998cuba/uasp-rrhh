import { Component, OnInit } from '@angular/core';
import { MODELOS_ROOT, PLANTILLA_ROOT, SISTEMA_ROOT } from 'src/app/data/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  year = new Date().getFullYear()
  plantilla = PLANTILLA_ROOT; modelos = MODELOS_ROOT; sistema = SISTEMA_ROOT
}
