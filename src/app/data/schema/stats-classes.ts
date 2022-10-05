import { Unidad } from "./model/unidad"

export class PromResult {
    mes!: number
    promTotalAct!: number
    promTotalAcum!: number
    promMujeresAct!: number
    promMujeresAcum!: number
}

export class TiempoResult {
    mes!: number
    tiempoAct!: number
    tiempoAcum!: number
}

export class SalarioResult {
    unidad!: Unidad
    salario!: number
}