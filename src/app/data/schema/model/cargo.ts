import { Escala } from "./escala"

export class Cargo {
    id!: number
    nombre!: string
    nocturnidad?: number
    plazas!: number
    idEscala!: Escala
}
