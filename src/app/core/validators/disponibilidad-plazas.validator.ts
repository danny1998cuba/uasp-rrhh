import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Cargo, Departamento } from "src/app/data/schema";
import { DepCargoService } from "src/app/data/services/api/dep-cargo.service";

export function disponibilidadPlazasValidator(
    dcService: DepCargoService,
    idTrabajador: number
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const form = control as FormGroup
        const cargoControl = form.get("idCargo")

        const dep: Departamento = form.get("idDepartamento")?.value;
        const cargo: Cargo = cargoControl?.value;

        if (dep && cargo) {
            let disp = true
            dcService.disponibilidad(dep.id, cargo.id, idTrabajador).subscribe(v => {
                if (!v.error) {
                    disp = v.data
                    if (!disp) {
                        cargoControl?.setErrors({ plazas: true })
                        return { plazas: true }
                    } else {
                        cargoControl?.setErrors(null)
                        return null
                    }
                }
                return null
            })
        }
        return null
    }
}