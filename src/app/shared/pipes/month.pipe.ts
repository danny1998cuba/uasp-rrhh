import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: number): string | null {
    let date = new Date(2022, value)
    return new DatePipe('es-ES').transform(date, 'MMMM');
  }

}
