import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ausentismo',
  templateUrl: './ausentismo.component.html',
  styleUrls: ['./ausentismo.component.css']
})
export class AusentismoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  obtainMonth(date: Date) {
    console.log(date)
  }
}
