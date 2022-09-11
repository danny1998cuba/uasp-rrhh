import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mujeresNF(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup

        const mujeresControl = form.get("mujeresNF")
        const mujeres = mujeresControl?.value;

        if (mujeres) {
            let suma = 0
            Object.keys(form.controls).forEach(key => {
                if (key != 'referencia' && key != 'categoria'
                    && key != 'teletrab' && key != 'pesquisa'
                    && key != 'vacunacion' && key != 'otro_puesto'
                    && key != 'mujeresNF') {
                    suma += form.controls[key].value
                }
            })

            if (suma < mujeres) {
                mujeresControl.setErrors({ mayorNoFisico: true })
                return { mayorNoFisico: true }
            } else {
                mujeresControl.setErrors(null)
                return null
            }
        }

        return null
    }
}