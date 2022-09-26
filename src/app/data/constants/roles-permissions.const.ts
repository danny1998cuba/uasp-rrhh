import { ROLES } from "./roles.const";

export const ROLES_PERMS = [
    {
        role: ROLES.ADMIN,
        perms: [
            "Gestión de usuarios",
            "Gestión de elementos del sistema",
            "Gestión de datos personales"
        ]
    },
    {
        role: ROLES.JDEP,
        perms: [
            "Gestión de la plantilla",
            "Acceso a listados de trabajadores",
            "Acceso a los modelos de la entidad",
            "Gestión de algunos elementos del sistema",
            "Gestión de datos personales"
        ]
    },
    {
        role: ROLES.USER,
        perms: [
            "Acceso a listados de trabajadores",
            "Acceso a los modelos de la entidad",
            "Gestión de datos personales"
        ]
    },
]