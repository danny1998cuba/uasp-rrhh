import { FullNamePipe } from "./full-name.pipe";
import { RoleListPipe } from "./role-list.pipe";
import { UndefinedPipe } from "./undefined.pipe";

export const pipes: any[] = [
    FullNamePipe,
    RoleListPipe,
    UndefinedPipe
]

export * from "./full-name.pipe";
export * from "./role-list.pipe";
export * from "./undefined.pipe";
