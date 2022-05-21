import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as fromComponents from './components/index'
import * as fromPipes from './pipes/index'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Material
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    
    //Material...
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [...fromComponents.components, ...fromPipes.pipes],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ...fromComponents.components,
    ...fromPipes.pipes,

    //Material...
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
