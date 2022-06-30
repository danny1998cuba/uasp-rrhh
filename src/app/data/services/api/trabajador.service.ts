import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { COUNT, GESTION_ROUTES } from '../../constants/routes/api.routes';
import { IApiService } from '../../interfaces';
import { ApiClass, ResponseHandler, Trabajador } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService extends ApiClass implements IApiService<Trabajador, number> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Trabajador
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Trabajador[]>(GESTION_ROUTES.TRABAJADOR, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener todas las Trabajador
  getByFilter(object: Trabajador): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<Trabajador[]>(GESTION_ROUTES.TRABAJADOR_FILTER, object, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  countByFilter(object: Trabajador): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<Trabajador[]>(GESTION_ROUTES.TRABAJADOR + COUNT, object, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Trabajador por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Trabajador[]>(GESTION_ROUTES.TRABAJADOR + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una Trabajador
  create(value: Trabajador): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.TRABAJADOR, value, { headers: this.headers, withCredentials: true })
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
  update(id: number, value: Trabajador): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.TRABAJADOR + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Trabajador
  delete(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.TRABAJADOR + '/' + id, { headers: this.headers, withCredentials: true })
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
