import { ROLES } from "src/app/data/constants";
import { Authenticated } from "./authenticated";

export function evaluateRoles(roles: string[]): boolean {
    let flag = false

    for (let r of roles) {
        switch (r) {
            case ROLES.ADMIN:
                flag = Authenticated.isAdmin
                console.log(flag);
                break
            case ROLES.JDEP:
                flag = Authenticated.isJDep
                console.log(flag);
                break
            case ROLES.USER:
                flag = Authenticated.isUser
                console.log(flag);
                break
            default:
                flag = false
                break
        }
        if (flag)
            break;
    }
    return flag
}