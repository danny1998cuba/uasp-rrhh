import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { IApiService } from '../../interfaces';
import { ApiClass, NivelEscolar, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class NivelEscolarService extends ApiClass implements IApiService<NivelEscolar, number> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Nivel Escolar
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<NivelEscolar[]>(GESTION_ROUTES.NIVEL_ESCOLAR, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Nivel Escolar por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<NivelEscolar[]>(GESTION_ROUTES.NIVEL_ESCOLAR + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una Nivel Escolar
  create(value: NivelEscolar): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.NIVEL_ESCOLAR, value, { headers: this.headers, withCredentials: true })
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
  update(id: number, value: NivelEscolar): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.NIVEL_ESCOLAR + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Nivel Escolar
  delete(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.NIVEL_ESCOLAR + '/' + id, { headers: this.headers, withCredentials: true })
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
