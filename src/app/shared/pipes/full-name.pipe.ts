import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/data/schema';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: Usuario): string {
    return user.nombre + ' ' + user.apellidos
  }

}
