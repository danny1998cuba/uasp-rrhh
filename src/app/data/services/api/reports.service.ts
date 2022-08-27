import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { base64toPdf } from 'src/app/core/utils';
import { TrabajadorFilterPipe } from 'src/app/shared/pipes';
import { REPORTS } from '../../constants';
import { ApiClass, ResponseHandler, Trabajador } from '../../schema';

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

  unidades(): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(REPORTS.UNIDAD + '?tipo=pdf',
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
}