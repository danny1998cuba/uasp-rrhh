import { STORAGE_KEYS } from "src/app/data/constants"
import { Usuario } from "src/app/data/schema"

export abstract class Authenticated {
    static get getUserFromLS(): Usuario | undefined {
        if (sessionStorage.length != 0) {
            const item = sessionStorage.getItem(STORAGE_KEYS.USER)
            if (item)
                return JSON.parse(item)
            else
                return undefined
        } else {
            return undefined
        }
    }

    static get isAdmin(): boolean {
        const user = this.getUserFromLS
        if (user)
            return user.rolList.filter(r => r.nombre == 'ADMIN').length != 0

        return false
    }

    static get isJDep(): boolean {
        const user = this.getUserFromLS
        if (user)
            return user.rolList.filter(r => r.nombre == 'JDEP').length != 0

        return false
    }

    static get isUser(): boolean {
        const user = this.getUserFromLS
        if (user)
            return user.rolList.filter(r => r.nombre == 'USER').length != 0

        return false
    }
}
