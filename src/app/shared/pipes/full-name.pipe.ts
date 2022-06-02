import { Pipe, PipeTransform } from '@angular/core';
import { Trabajador, Usuario } from 'src/app/data/schema';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(obj: Usuario | Trabajador): string {
    return obj.nombre + ' ' + obj.apellidos
  }

}
