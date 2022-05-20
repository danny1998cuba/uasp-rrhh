import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { IApiService } from '../../interfaces';
import { ApiClass, Departamento, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends ApiClass implements IApiService<Departamento, number> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Departamentos
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Departamento[]>(GESTION_ROUTES.DEPARTAMENTO, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Departamento por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Departamento[]>(GESTION_ROUTES.DEPARTAMENTO + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una Departamento
  create(value: Departamento): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.DEPARTAMENTO, value, { headers: this.headers, withCredentials: true })
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
  update(id: number, value: Departamento): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.DEPARTAMENTO + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Departamento
  delete(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.DEPARTAMENTO + '/' + id, { headers: this.headers, withCredentials: true })
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
