import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Cargo, NivelEscolar } from "src/app/data/schema";

export function nivelEscolarValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup

        const nivelEscolarControl = form.get("nivelEscolar")

        const nivelEscolar = nivelEscolarControl?.value;
        const cargo: Cargo = form.get("idCargo")?.value;
        
        console.log(nivelEscolar)
        console.log(cargo)

        if (nivelEscolar && cargo) {
            if (nivelEscolar.relevancia < cargo.idEscolarMin.relevancia) {
                nivelEscolarControl.setErrors({nivEscMinReq:true})
                return {nivEscMinReq:true}
            } else {
                nivelEscolarControl.setErrors(null)
                return null
            }
        }

        return null
    }
}