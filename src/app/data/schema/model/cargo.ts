import { CatOcup } from "./cat-ocup"
import { Escala } from "./escala"
import { NivelEscolar } from "./nivel-escolar"

export class Cargo {
    id!: number
    nombre!: string
    nocturnidad?: number
    idCatOcup!: CatOcup
    idEscala!: Escala
    idEscolarMin!:NivelEscolar
}
