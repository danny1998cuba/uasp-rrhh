import { Pipe, PipeTransform } from '@angular/core';
import { Trabajador } from 'src/app/data/schema';

@Pipe({
  name: 'trabajadorFilter'
})
export class TrabajadorFilterPipe implements PipeTransform {

  transform(lastFilter: Trabajador): string {
    if (lastFilter) {
      var filters = ''
      let addedSome = false

      if (lastFilter.nombre != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Nombre: ' + lastFilter.nombre
      }
      if (lastFilter.apellidos != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Apellidos: ' + lastFilter.apellidos
      }
      if (lastFilter.ci != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Carné de identidad: ' + lastFilter.ci
      }
      if (lastFilter.sexo != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Sexo: ' + (lastFilter.sexo == 'm' ? 'Masculino' : 'Femenino')
      }
      if (lastFilter.maestria != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Maestria: ' + (lastFilter.maestria ? "Sí" : "No")
      }
      if (lastFilter.doctorado != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Doctorado: ' + (lastFilter.doctorado ? "Sí" : "No")
      }
      if (lastFilter.idCatDoc != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Categoria docente: ' + lastFilter.idCatDoc.tipo
      }
      if (lastFilter.idEscolar != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Nivel escolar: ' + lastFilter.idEscolar.abreviado
      }
      if (lastFilter.idDepartamento != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Departamento: ' +
          (lastFilter.idDepartamento.idUnidad.nombre + ' - ' + lastFilter.idDepartamento.nombre)
      }
      if (lastFilter.idCLA != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'CLA: Grupo ' + lastFilter.idCLA.grupo
      }
      if (lastFilter.idCargo != undefined) {
        if (addedSome) {
          filters += ' | '
        } else {
          addedSome = true
        }
        filters += 'Cargo: ' + lastFilter.idCargo.nombre
      }

      if (!addedSome) {
        return 'Sin filtros'
      }

      return filters
    } else {
      return 'Sin filtros'
    }
  }

}
