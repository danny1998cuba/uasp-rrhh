import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as fromComponents from './components/index'
import * as fromPipes from './pipes/index'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  declarations: [...fromComponents.components, ...fromPipes.pipes],
  exports:[
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class SharedModule { }
