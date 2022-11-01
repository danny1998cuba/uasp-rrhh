import { CardComponent } from "./card/card.component";
import { ClickableTrabajadorTableComponent } from "./clickable-trabajador-table/clickable-trabajador-table.component";
import { InfoDialogComponent } from "./clickable-trabajador-table/info-dialog/info-dialog.component";
import { DelDialogComponent } from "./del-dialog/del-dialog.component";
import { LoaderComponent } from "./loader/loader.component";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { MyPdfViewerComponent } from "./my-pdf-viewer/my-pdf-viewer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TitleBannerComponent } from "./title-banner/title-banner.component";
import { TitleDashComponent } from "./title-dash/title-dash.component";

export const components: any[] = [
    CardComponent,
    ClickableTrabajadorTableComponent,
    DelDialogComponent,
    InfoDialogComponent,
    LoaderComponent,
    MonthPickerComponent,
    MyPdfViewerComponent,
    SidebarComponent,
    TitleBannerComponent,
    TitleDashComponent
]

export * from "./card/card.component";
export * from "./clickable-trabajador-table/clickable-trabajador-table.component";
export * from "./del-dialog/del-dialog.component";
export * from "./clickable-trabajador-table/info-dialog/info-dialog.component";
export * from "./loader/loader.component";
export * from "./month-picker/month-picker.component";
export * from "./my-pdf-viewer/my-pdf-viewer.component";
export * from "./sidebar/sidebar.component";
export * from "./title-banner/title-banner.component"
export * from "./title-dash/title-dash.component"
