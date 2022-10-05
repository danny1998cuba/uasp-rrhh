import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fromComponents from './components/index'
import * as fromPipes from './pipes/index'
import * as fromCharts from './charts/index'

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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule,
    PdfViewerModule,

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
    MatSelectModule,
    MatSelectFilterModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatStepperModule,
    MatDividerModule
  ],
  declarations: [...fromComponents.components, ...fromPipes.pipes, ...fromCharts.charts],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule,
    PdfViewerModule,

    ...fromComponents.components,
    ...fromPipes.pipes,
    ...fromCharts.charts,

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
    MatSelectModule,
    MatSelectFilterModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatStepperModule,
    MatDividerModule
  ]
})
export class SharedModule { }
