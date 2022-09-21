import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { DepCargoService } from "../../services/api/dep-cargo.service";
import { DepartamentoCargo } from "../model/departamento-cargo";
import { DepartamentoCargoPK } from "../model/departamento-cargo-pk";
import { ServicesConsumer } from "./services-consumer";

export class DepCargoConsumer extends ServicesConsumer<DepartamentoCargo, DepartamentoCargoPK> {

    constructor(
        service: DepCargoService,
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