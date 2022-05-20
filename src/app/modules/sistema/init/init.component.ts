import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  isLoading = true  //loader
  

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 2000);
  }

}
