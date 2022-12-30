import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/data/services';
import { Authenticated } from '../utils';
import { CookieService } from 'ngx-cookie-service';
import { STORAGE_KEYS } from 'src/app/data/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private cookies: CookieService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = this.authService.headers
    headers.append("authorization", this.cookies.get(STORAGE_KEYS.AUTH_TOKEN))

    if (Authenticated.getUserFromLS && request.url.indexOf('basicauth') === -1) {
      const authReq = request.clone({
        headers: headers
      });
      return next.handle(authReq)
    } else {
      return next.handle(request)
    }
  }
}
