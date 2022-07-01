import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrabajadorFilterPipe } from 'src/app/shared/pipes';
import { REPORTS } from '../../constants';
import { ApiClass, Trabajador } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  filtered(object: Trabajador): Observable<Blob> {
    this.headers.append('response-type', 'blob')
    return this.http.post<Blob>(REPORTS.FILTERED + '?tipo=pdf',
      { filtros: new TrabajadorFilterPipe().transform(object), example: object }, { headers: this.headers, withCredentials: true, responseType: 'blob' as 'json' });
  }
}