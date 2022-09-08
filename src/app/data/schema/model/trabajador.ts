import { Cargo } from "./cargo"
import { CatDoc } from "./cat-doc"
import { Cla } from "./cla"
import { Departamento } from "./departamento"
import { NivelEscolar } from "./nivel-escolar"

export class Trabajador {
    id!: number
    nombre!: string
    apellidos!: string
    ci!: string
    sexo!: string
    maestria!: boolean
    doctorado!: boolean
    mision!: boolean
    idCatDoc?: CatDoc
    idEscolar!: NivelEscolar
    idDepartamento!: Departamento
    idCLA?: Cla
    idCargo!: Cargo

    nocturnidades?: number
}
