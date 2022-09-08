import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { ApiClass, Levantamiento, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class LevantamientoService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Levantamientos
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Levantamiento[]>(GESTION_ROUTES.LEVANTAMIENTO, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Levantamiento por id
  getById(id: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<Levantamiento[]>(GESTION_ROUTES.LEVANTAMIENTO + '/' + id, { headers: this.headers, withCredentials: true })
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
    return this.http.get<Levantamiento[]>(
      GESTION_ROUTES.LEVANTAMIENTO + '/mes?fecha=' + new DatePipe('es-ES').transform(fecha, "yyyy-MM-dd"),
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
