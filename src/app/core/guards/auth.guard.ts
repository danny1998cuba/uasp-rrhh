import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_ROUTE } from 'src/app/data/constants';
import { Authenticated } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (Authenticated.getUserFromLS) {
      return true;
    }

    this.router.navigate(['/' + LOGIN_ROUTE], {
      queryParams: { returnUrl: state.url }
    })
    return false
  }

}
