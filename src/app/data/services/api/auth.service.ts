import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable } from 'rxjs';
import { LOGIN_ROUTE, MODELOS_ROOT, SITE_ROOT, STORAGE_KEYS } from '../../constants';
import { LOGIN_ROUTES, PASS_RESTORE } from '../../constants/routes/api.routes';
import { ApiClass, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiClass {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: CookieService
  ) {
    super()
  }

  login(username: string, password: string): Observable<ResponseHandler> {

    if (this.cookies.check(STORAGE_KEYS.AUTH_TOKEN)) {
      this.cookies.delete(STORAGE_KEYS.AUTH_TOKEN)
    }

    const response = new ResponseHandler()
    this.headers.append("authorization", this.createBasicAuthToken(username, password))

    return this.http.post<any>(LOGIN_ROUTES.LOGIN,
      { username: username, password: password },
      { headers: this.headers })
      .pipe(
        map(r => {
          response.msg = "Autenticado con exito"
          response.status = HttpStatusCode.Ok

          this.setUserToLS(r)
          this.cookies.set(STORAGE_KEYS.AUTH_TOKEN, this.createBasicAuthToken(username, password))

          this.router.navigateByUrl('/' + SITE_ROOT)
          return response;
        }),
        catchError(this.error)
      );
  }




  logout() {
    // const response = new ResponseHandler()
    // return this.http.get<any>(LOGIN_ROUTES.LOGOUT,
    //   { headers: this.headers })
    //   .pipe(
    //     map(r => {
    //       this.cookies.deleteAll()
    //       sessionStorage.removeItem(STORAGE_KEYS.USER)

    //       response.msg = "Sesion cerrada con exito"
    //       response.status = HttpStatusCode.Ok

    //       this.router.navigateByUrl('/' + LOGIN_ROUTE)

    //       return response;
    //     }),
    //     catchError(this.error)
    //   );

    sessionStorage.removeItem(STORAGE_KEYS.USER)
    this.cookies.deleteAll()
    this.router.navigateByUrl('/' + LOGIN_ROUTE)
  }

  // getUser(): Observable<ResponseHandler> {
  //   const response = new ResponseHandler()
  //   return this.http.get<any>(LOGIN_ROUTES.ACTIVE_USER,
  //     { headers: this.headers, withCredentials: true })
  //     .pipe(
  //       map(r => {
  //         response.msg = "Usuario"
  //         response.data = r;
  //         response.status = HttpStatusCode.Ok

  //         this.setUserToLS(r)

  //         if (!response.error) {
  //           this.router.navigateByUrl('/' + SITE_ROOT)
  //         }
  //         return response;
  //       }),
  //       catchError(this.error)
  //     );
  // }

  restorePass(identificador: String): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(PASS_RESTORE, identificador,
      { headers: this.headers })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok

          return response;
        }),
        catchError(this.error)
      );
  }

  private setUserToLS(data: any) {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data))
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }
}
