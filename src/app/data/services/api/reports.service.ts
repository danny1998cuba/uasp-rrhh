import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { base64toPdf } from 'src/app/core/utils';
import { TrabajadorFilterPipe } from 'src/app/shared/pipes';
import { REPORTS } from '../../constants';
import { ApiClass, Ausencias, Levantamiento, ResponseHandler, Trabajador } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  filtered(object: Trabajador): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.post<any>(REPORTS.FILTERED + '?tipo=pdf',
      { filtros: new TrabajadorFilterPipe().transform(object), example: object },
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toPdf(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  unidades(idUnidad: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(REPORTS.UNIDAD + '?unidadId=' + idUnidad + '&tipo=pdf',
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toPdf(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  p2(idUnidad: number): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(REPORTS.P2 + '?tipo=pdf&unidadId=' + idUnidad,
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toPdf(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  plantillaAC(): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(REPORTS.PLANTILLA_AC + '?tipo=pdf',
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toPdf(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  grupoEscala(): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(REPORTS.GRUPO_ESCALA + '?tipo=pdf',
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toPdf(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  ausentismo(mes: Date, data: Ausencias[]): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.post<any>(REPORTS.AUSENTISMO +
      '?tipo=pdf&mes=' + new DatePipe('es-ES').transform(mes, 'yyyy-MM-dd'),
      data,
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          // response.data = base64toPdf(r.msg);
          response.data = r
          return response;
        }),
        catchError(this.error)
      );
  }

  levantamiento(mes: Date, data: Levantamiento[]): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.post<any>(REPORTS.LEVANTAMIENTO +
      '?tipo=pdf&mes=' + new DatePipe('es-ES').transform(mes, 'yyyy-MM-dd'),
      data,
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          // response.data = base64toPdf(r.msg);
          response.data = r
          return response;
        }),
        catchError(this.error)
      );
  }
}