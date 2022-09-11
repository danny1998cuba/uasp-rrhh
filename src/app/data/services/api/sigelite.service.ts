import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { base64toXML } from 'src/app/core/utils';
import { SIGELITE } from '../../constants';
import { ApiClass, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class SigeliteService extends ApiClass {

  constructor(private http: HttpClient) {
    super()
  }

  F5202(observ: string | undefined): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(SIGELITE.F5202 + (observ ? ('?observ=' + observ) : ''),
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toXML(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }

  F5205(observ: string | undefined): Observable<ResponseHandler> {
    const response = new ResponseHandler()

    return this.http.get<any>(SIGELITE.F5205 + (observ ? ('?observ=' + observ) : ''),
      { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = base64toXML(r.msg);
          return response;
        }),
        catchError(this.error)
      );
  }
}
