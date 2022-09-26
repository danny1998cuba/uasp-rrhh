import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { STATS_ROUTES } from '../../constants';
import { ApiClass, PromResult, ResponseHandler, SalarioResult, TiempoResult } from '../../schema';

@Injectable({ providedIn: 'root' })
export class StatsService extends ApiClass {

    constructor(private http: HttpClient) {
        super()
    }

    promedio(): Observable<ResponseHandler> {
        const response = new ResponseHandler()
        return this.http.get<PromResult[]>(STATS_ROUTES.PROMEDIO, { headers: this.headers, withCredentials: true })
            .pipe(
                map(r => {
                    response.data = r;
                    return response;
                }),
                catchError(this.error)
            );
    }

    tiempo(): Observable<ResponseHandler> {
        const response = new ResponseHandler()
        return this.http.get<TiempoResult[]>(STATS_ROUTES.TIEMPO, { headers: this.headers, withCredentials: true })
            .pipe(
                map(r => {
                    response.data = r;
                    return response;
                }),
                catchError(this.error)
            );
    }

    salario(): Observable<ResponseHandler> {
        const response = new ResponseHandler()
        return this.http.get<SalarioResult[]>(STATS_ROUTES.SALARIO, { headers: this.headers, withCredentials: true })
            .pipe(
                map(r => {
                    response.data = r;
                    return response;
                }),
                catchError(this.error)
            );
    }

}