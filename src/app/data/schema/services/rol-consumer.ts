import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { RolService } from "../../services";
import { Rol } from "../model/rol";
import { ServicesConsumer } from "./services-consumer";

export class RolConsumer extends ServicesConsumer<Rol, number> {

    constructor(
        service: RolService,
        router: Router
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

    override add(cont: Rol): void {
        console.log('Not Allowed')
    }

    override mod(cont: Rol, id: number): void {
        console.log('Not Allowed')
    }

    override del(id: number): void {
        console.log('Not Allowed')
    }
}
