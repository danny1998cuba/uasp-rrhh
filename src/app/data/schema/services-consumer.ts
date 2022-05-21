import { HttpStatusCode } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { IApiService } from "../interfaces";

export class ServicesConsumer<T, PK> {

    data: T[] = []
    isLoading = true
    
    constructor(
        protected service: IApiService<T, PK>,
        protected router: Router,
    ) {
        this.refreshData()
    }
    
    refreshData(){}
    sendMsg(msg:string){}

    add(cont: T) {
        this.service.create(cont).subscribe(
            r => {
                if (r.status == HttpStatusCode.Created) {
                    this.isLoading = true;
                    this.refreshData()
                } else {
                    this.sendMsg(r.msg)
                }
            }
        )
    }

    mod(cont: T, id: PK) {
        this.service.update(id, cont).subscribe(
            r => {
                if (r.status == HttpStatusCode.Ok) {
                    this.isLoading = true;
                    this.refreshData()
                } else {
                    this.sendMsg(r.msg)
                }
            }
        )
    }

    del(id: PK) {
        this.service.delete(id).subscribe(
            r => {
                if (r.status == HttpStatusCode.Ok) {
                    this.isLoading = true;
                    this.refreshData()
                } else {
                    this.sendMsg(r.msg)
                }
            }
        )
    }

}
