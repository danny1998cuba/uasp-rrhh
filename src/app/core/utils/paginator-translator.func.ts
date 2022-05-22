import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = "Elementos por página"
    customPaginatorIntl.firstPageLabel = "Primera página"
    customPaginatorIntl.lastPageLabel = "Última página"
    customPaginatorIntl.nextPageLabel = "Siguiente página"
    customPaginatorIntl.previousPageLabel = "Página anterior"

    return customPaginatorIntl
}