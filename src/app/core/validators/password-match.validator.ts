import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup

        const newPass2Control = form.get("newPass2")

        const newPass1 = newPass2Control?.value;
        const newPass2: String = form.get("newPass")?.value;

        if (newPass1 && newPass2) {
            if (newPass1 !== newPass2) {
                newPass2Control.setErrors({ passMatch: true })
                return { passMatch: true }
            } else {
                newPass2Control.setErrors(null)
                return null
            }
        }

        return null
    }
}