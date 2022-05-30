import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from 'src/app/data/schema';

@Pipe({
  name: 'roleList'
})
export class RoleListPipe implements PipeTransform {

  transform(roles: Rol[]): string {
    let retorno = ''
    roles.forEach((r, i) => {
      retorno += r.descripcion;
      if (i < roles.length - 1) {
        retorno += ', '
      }
    })
    return retorno;
  }

}
