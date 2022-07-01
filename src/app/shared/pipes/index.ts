import { FullNamePipe } from "./full-name.pipe";
import { RoleListPipe } from "./role-list.pipe";
import { TrabajadorFilterPipe } from "./trabajador-filter.pipe";
import { UndefinedPipe } from "./undefined.pipe";

export const pipes: any[] = [
    FullNamePipe,
    RoleListPipe,
    TrabajadorFilterPipe,
    UndefinedPipe
]

export * from "./full-name.pipe";
export * from "./role-list.pipe";
export * from "./trabajador-filter.pipe";
export * from "./undefined.pipe";
