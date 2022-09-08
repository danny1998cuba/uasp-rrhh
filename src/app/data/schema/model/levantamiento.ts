import { CatOcup } from "./cat-ocup";

export class Levantamiento {

    id!: number
    fecha!: Date
    idcatOcup !: CatOcup;

    madres: number = 0
    aislamiento: number = 0
    covid: number = 0
    noCovid: number = 0
    peritados: number = 0
    embarazo: number = 0
    licMat: number = 0
    otraLic: number = 0
    vacaciones: number = 0
    interruptos: number = 0
    teletrabajo: number = 0
    pesquisa: number = 0
    vacunacion: number = 0
    otroPuesto: number = 0
}