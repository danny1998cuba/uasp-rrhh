import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants/routes/api.routes';
import { ApiClass, Escala, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class EscalaService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las escalas
  getEscala(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Escala[]>(GESTION_ROUTES.ESCALA, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener escala por id
  getEscalaById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Escala[]>(GESTION_ROUTES.ESCALA + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Crear una escala
  createEscala(value: Escala): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.ESCALA, value, { headers: this.headers, withCredentials: true })
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
  updateEscala(id: number, value: Escala): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.ESCALA + '/' + id, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar escala
  deleteEscala(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.ESCALA + '/' + id, { headers: this.headers, withCredentials: true })
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
