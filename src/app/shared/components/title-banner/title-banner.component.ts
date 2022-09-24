import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.css']
})
export class TitleBannerComponent {

  @Input() title = 'Titulo por defecto'
  @Input() image_src!: string | undefined

  constructor() { }
}
