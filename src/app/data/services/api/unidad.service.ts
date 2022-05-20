import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants/routes/api.routes';
import { IApiService } from '../../interfaces';
import { ApiClass, ResponseHandler, Unidad } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class UnidadService extends ApiClass implements IApiService<Unidad, number> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Unidad
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Unidad[]>(GESTION_ROUTES.UNIDAD, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Unidad por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Unidad[]>(GESTION_ROUTES.UNIDAD + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una Unidad
  create(value: Unidad): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.UNIDAD, value, { headers: this.headers, withCredentials: true })
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
  update(id: number, value: Unidad): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.UNIDAD + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Unidad
  delete(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.UNIDAD + '/' + id, { headers: this.headers, withCredentials: true })
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
