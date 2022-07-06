import { CardComponent } from "./card/card.component";
import { ClickableTrabajadorTableComponent } from "./clickable-trabajador-table/clickable-trabajador-table.component";
import { DelDialogComponent } from "./del-dialog/del-dialog.component";
import { LoaderComponent } from "./loader/loader.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

export const components: any[] = [
    CardComponent,
    ClickableTrabajadorTableComponent,
    DelDialogComponent,
    LoaderComponent,
    SidebarComponent
]

export * from "./card/card.component";
export * from "./clickable-trabajador-table/clickable-trabajador-table.component";
export * from "./del-dialog/del-dialog.component";
export * from "./loader/loader.component";
export * from "./sidebar/sidebar.component";
