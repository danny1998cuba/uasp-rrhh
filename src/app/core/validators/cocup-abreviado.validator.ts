import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CatOcup } from "src/app/data/schema";

export function cOcupAbreviado(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup

        const abreviadoControl = form.get("abreviado")

        const abreviado = abreviadoControl?.value;
        const parent: CatOcup = form.get("parent")?.value;

        if (parent && abreviado) {
            if (abreviado != parent.abreviado) {
                abreviadoControl.setErrors({ parentMatch: true })
                return { parentMatch: true }
            } else {
                abreviadoControl.setErrors(null)
                return null
            }
        }

        return null
    }
}