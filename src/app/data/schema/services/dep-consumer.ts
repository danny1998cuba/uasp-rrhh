import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { DepartamentoService, RolService } from "../../services";
import { Departamento } from "../model/departamento";
import { ServicesConsumer } from "./services-consumer";

export class DepsConsumer extends ServicesConsumer<Departamento, number> {

    constructor(
        service: DepartamentoService,
        router: Router,
        private snackBar: MatSnackBar
    ) {
        super(service, router);
    }

    override async refreshData() {
        await firstValueFrom(this.service.getAll()).then(
            r => {
                if (!r.error) {
                    this.data = r.data;
                } else {
                    this.router.navigateByUrl('/home');
                }
            }
        )
        this.isLoading = false
    }

    override sendMsg(msg: string) {
        this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
    }
}
