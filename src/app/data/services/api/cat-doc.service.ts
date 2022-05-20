import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { ApiClass, CatDoc, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class CatDocService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las CatDocs
  getCatDoc(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<CatDoc[]>(GESTION_ROUTES.CAT_DOC, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener CatDoc por id
  getCatDocById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<CatDoc[]>(GESTION_ROUTES.CAT_DOC + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una CatDoc
  createCatDoc(value: CatDoc): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.CAT_DOC, value, { headers: this.headers, withCredentials: true })
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
  updateCatDoc(id: number, value: CatDoc): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.CAT_DOC + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar CatDoc
  deleteCatDoc(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.CAT_DOC + '/' + id, { headers: this.headers, withCredentials: true })
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
