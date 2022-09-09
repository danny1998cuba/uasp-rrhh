import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Cargo, Departamento } from "src/app/data/schema";

export function menorReferenciaEach(
    referencia: number
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control) {
            if (control.value && control.value > referencia) {
                control.setErrors({ mayorRef: true })
                return { mayorRef: true }
            } else {
                control.setErrors(null)
                return null
            }
        }
        return null
    }
}