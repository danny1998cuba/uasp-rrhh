import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { ApiClass, CatOcup, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class CatOcupService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las CatOcups
  getCatOcup(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<CatOcup[]>(GESTION_ROUTES.CAT_OCUP, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener CatOcup por id
  getCatOcupById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<CatOcup[]>(GESTION_ROUTES.CAT_OCUP + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una CatOcup
  createCatOcup(value: CatOcup): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.CAT_OCUP, value, { headers: this.headers, withCredentials: true })
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
  updateCatOcup(id: number, value: CatOcup): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.CAT_OCUP + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar CatOcup
  deleteCatOcup(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.CAT_OCUP + '/' + id, { headers: this.headers, withCredentials: true })
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
