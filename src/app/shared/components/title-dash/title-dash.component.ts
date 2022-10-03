import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-dash',
  template: '<div class="box"><h1 class= "title text-center"> {{ text }}</h1></div>',
  styleUrls: ['./title-dash.component.css']
})
export class TitleDashComponent {

  @Input() text: string = 'Title'

  constructor() { }

  ngOnInit(): void {
  }

}
