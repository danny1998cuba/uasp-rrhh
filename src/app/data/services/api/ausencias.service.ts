import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { ApiClass, Ausencias, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Ausencias
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Ausencias[]>(GESTION_ROUTES.AUSENCIAS, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Ausencias por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Ausencias[]>(GESTION_ROUTES.AUSENCIAS + '/' + id, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  getByMonth(fecha: Date): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Ausencias[]>(
      GESTION_ROUTES.AUSENCIAS + '?fecha=' + new DatePipe('es-ES').transform(fecha, "yyyy-MM-dd"),
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }
}