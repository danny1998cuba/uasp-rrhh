import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() text_align: 'center' | 'start' | 'end' | undefined
  @Input() title: string | undefined;
  @Input() image_src: string | undefined;

  constructor() { }
}
