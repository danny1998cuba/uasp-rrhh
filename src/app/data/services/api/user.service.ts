import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES, PASS_ROUTE } from '../../constants/routes/api.routes';
import { ApiClass, ResponseHandler, User } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las User
  getUser(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<User[]>(GESTION_ROUTES.USERS, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener User por id
  getUserById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<User[]>(GESTION_ROUTES.USERS + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una User
  createUser(value: User): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.USERS, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Created
          return response;
        }),
        catchError(this.error)
      );
  }

  // Actualizar entrada existente
  updateUser(id: number, value: User): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.USERS + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar User
  deleteUser(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.USERS + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  changePass(id: number, oldPass: string, newPass: string): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(PASS_ROUTE + '/' + id,
      { oldPassword: oldPass, newPassword: newPass },
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r.msg;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }
}
