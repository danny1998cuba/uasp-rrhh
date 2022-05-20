import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { IApiService } from '../../interfaces';
import { ApiClass, Cla, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class ClaService extends ApiClass implements IApiService<Cla, number> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Clas
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Cla[]>(GESTION_ROUTES.CLA, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Cla por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Cla[]>(GESTION_ROUTES.CLA + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una Cla
  create(value: Cla): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.CLA, value, { headers: this.headers, withCredentials: true })
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
  update(id: number, value: Cla): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.CLA + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Cla
  delete(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.CLA + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }
}
