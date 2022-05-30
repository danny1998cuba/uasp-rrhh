import { Rol } from ".."

export class Usuario {
    id!: number
    username!: string
    password!: string
    nombre!: string
    apellidos!: string
    email?: string
    telefono?: string
    enabled!: boolean
    rolList!: Rol[]
}