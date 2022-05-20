import { Observable } from "rxjs";
import { ResponseHandler } from "../schema";

export interface IApiService<T, PK> {
    getAll(): Observable<ResponseHandler>
    getById(id: PK): Observable<ResponseHandler>
    create(value: T): Observable<ResponseHandler>
    update(id: PK, value: T): Observable<ResponseHandler>
    delete(id: PK): Observable<ResponseHandler>
}