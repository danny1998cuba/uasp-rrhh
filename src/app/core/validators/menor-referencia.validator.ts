import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function menorReferencia(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup

        const referencia = form.get("referencia")
        const refValue = referencia?.value;

        if (referencia) {
            let suma = 0
            Object.keys(form.controls).forEach(key => {
                if (key != 'referencia' && key != 'categoria') {
                    suma += form.controls[key].value
                }
            })

            if (suma > refValue) {
                referencia.setErrors({ mayorRef: true })
                return { mayorRef: true }
            } else {
                referencia.setErrors(null)
                return null
            }
        }

        return null
    }
}