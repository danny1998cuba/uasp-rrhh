import { CatOcup } from "./cat-ocup";

export class Ausencias {

    id!: number
    fecha!: Date
    idcatOcup!: CatOcup
    autorizado: number = 0
    enfermedad: number = 0
    iss: number = 0
    accidentes: number = 0
    injustificado: number = 0

}