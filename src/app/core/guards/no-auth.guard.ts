import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PLANTILLA_ROOT, SISTEMA_ROOT } from 'src/app/data/constants';
import { Authenticated } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (Authenticated.getUserFromLS) {
      this.router.navigateByUrl('/' + PLANTILLA_ROOT)
      return false
    }

    return true
  }
  
}
