import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Escala } from 'src/app/data/schema';

@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.css']
})
export class EscalasComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'clasificador', 'salario', 'actions'];
  dataSource: MatTableDataSource<Escala>;
  isLoading = true

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(
      Array.from([
        {
          id: 0,
          clasificador: 'XXI',
          salario: 2100
        },
        {
          id: 1,
          clasificador: 'XXII',
          salario: 2190
        }
      ])
    );
    setTimeout(() => {
      this.isLoading = false
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
