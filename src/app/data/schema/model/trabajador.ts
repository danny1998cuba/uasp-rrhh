import { Cargo } from "./cargo"
import { CatDoc } from "./cat-doc"
import { CatOcup } from "./cat-ocup"
import { Cla } from "./cla"
import { Departamento } from "./departamento"

export class Trabajador {
    id!: number
    nombre!: string
    apellidos!: string
    ci!: string
    sexo!: string
    nivelEscolar!: string
    maestria!: boolean
    doctorado!: boolean
    idcatOcup!: CatOcup
    idcatDoc?: CatDoc
    idDepartamento!: Departamento
    idCLA?: Cla
    idCargo!: Cargo
}
