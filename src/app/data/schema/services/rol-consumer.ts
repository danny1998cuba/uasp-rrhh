import { Router } from "@angular/router";
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
