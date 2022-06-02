import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DepartamentoService, RolService } from "../../services";
import { Departamento } from "../model/departamento";
import { Rol } from "../model/rol";
import { ServicesConsumer } from "./services-consumer";

export class DepsConsumer extends ServicesConsumer<Departamento, number> {

    constructor(
        service: DepartamentoService,
        router: Router,
        private snackBar: MatSnackBar
    ) {
        super(service, router);
    }

    override refreshData() {
        this.service.getAll().subscribe(
            r => {
                if (!r.error) {
                    this.data = r.data;
                    setTimeout(() => this.isLoading = false, 1000)
                } else {
                    this.router.navigateByUrl('/home');
                }
            }
        )
    }

    override sendMsg(msg: string) {
        this.snackBar.open(msg, '', { duration: 2000, horizontalPosition: 'end' })
    }
}
