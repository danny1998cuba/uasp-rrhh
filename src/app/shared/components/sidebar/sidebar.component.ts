import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ISidebarData } from './sidebar.metadata';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() data : ISidebarData = {
    icon: faUser,
    options : [
      {
        nombre:'Default',
        link:''
      }
    ]
  }


  constructor() { }

  ngOnInit(): void {
  }

}
