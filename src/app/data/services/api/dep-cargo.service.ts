import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { GESTION_ROUTES } from '../../constants';
import { IApiService } from '../../interfaces';
import { ApiClass, DepartamentoCargo, DepartamentoCargoPK, ResponseHandler } from '../../schema';

@Injectable({
  providedIn: 'root'
})
export class DepCargoService extends ApiClass implements IApiService<DepartamentoCargo, DepartamentoCargoPK> {

  constructor(private http: HttpClient) {
    super()
  }

  // Obtener todas las Departamentos
  getAll(): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<DepartamentoCargo[]>(GESTION_ROUTES.DEPARTAMENTO_CARGO, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  // Obtener Departamento por id
  getById(id: DepartamentoCargoPK): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.get<DepartamentoCargo>(GESTION_ROUTES.DEPARTAMENTO_CARGO + '/' + id.idDep + '/' + id.idCargo, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }),
        catchError(this.error)
      );
  }

  async getByIdAsync(id: DepartamentoCargoPK): Promise<ResponseHandler> {
    let response = new ResponseHandler()

    await lastValueFrom(
      this.http.get<DepartamentoCargo>(
        GESTION_ROUTES.DEPARTAMENTO_CARGO + '/' + id.idDep + '/' + id.idCargo,
        { headers: this.headers, withCredentials: true }
      ).pipe(
        map(r => {
          response.data = r;
          return response
        }),
        catchError(this.error)
      )
    ).then(v => {
      response = v
    })

    return response
  }

  // Crear una Departamento
  create(value: DepartamentoCargo): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.post<any>(GESTION_ROUTES.DEPARTAMENTO_CARGO, value, { headers: this.headers, withCredentials: true })
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
  update(id: DepartamentoCargoPK, value: DepartamentoCargo): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.put<any>(GESTION_ROUTES.DEPARTAMENTO_CARGO + '/' + + id.idDep + '/' + id.idCargo, value, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  // Eliminar Departamento
  delete(id: DepartamentoCargoPK): Observable<ResponseHandler> {
    const response = new ResponseHandler()
    return this.http.delete<any>(GESTION_ROUTES.DEPARTAMENTO_CARGO + '/' + id.idDep + '/' + id.idCargo, { headers: this.headers, withCredentials: true })
      .pipe(
        map(r => {
          response.data = r;
          response.status = HttpStatusCode.Ok
          return response;
        }),
        catchError(this.error)
      );
  }

  disponibilidad(idDep: number, idCargo: number, idTrabajador: number): Observable<ResponseHandler> {
    let response = new ResponseHandler()

    return this.http.get<DepartamentoCargo>(
      GESTION_ROUTES.DEPARTAMENTO_CARGO_DISP + '/' + idDep + '/' + idCargo +
      (idTrabajador != 0 ? '?trabajador=' + idTrabajador : ''),
      { headers: this.headers, withCredentials: true }
    ).pipe(
      map(r => {
        response.data = r;
        return response
      }),
      catchError(this.error)
    );
  }

}