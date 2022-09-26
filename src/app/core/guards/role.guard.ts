import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ROLES, _403_ROOT } from 'src/app/data/constants';
import { Authenticated, evaluateRoles } from '../utils';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let roles: string[] = route.data['roles']
        let flag = evaluateRoles(roles)

        if (!flag) {
            this.router.navigateByUrl('/' + _403_ROOT)
        }

        return flag;
    }
}