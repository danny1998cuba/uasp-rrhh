import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Cargo, CatOcup, Trabajador } from "src/app/data/schema";
import { TrabajadorService } from "src/app/data/services";

export function cantidadMujeres(
    tService: TrabajadorService,
    catOcup: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control && control.value) {
            let t = new Trabajador()
            t.sexo = 'f'
            t.idCargo = new Cargo()
            t.idCargo.idCatOcup = new CatOcup()
            t.idCargo.idCatOcup.abreviado = catOcup

            tService.countByFilter(t).subscribe(v => {
                if (!v.error) {
                    let total = v.data
                    if (total < control.value) {
                        control.setErrors({ ...(control.errors || {}), mayorTotalMujeres: true })
                        return { mayorTotalMujeres: true }
                    } else {
                        control.setErrors({ ...(control.errors || {}), mayorTotalMujeres: null })
                        control.updateValueAndValidity()
                        return null
                    }
                }
                return null
            })
        }
        return null
    }
}