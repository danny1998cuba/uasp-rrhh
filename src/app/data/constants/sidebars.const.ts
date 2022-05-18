import { faCog, faFile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { ISidebarData } from "src/app/shared/components/sidebar/sidebar.metadata";
import { MODELOS_ROUTES, PLANTILLA_ROUTES, SISTEMA_ROUTES } from "./routes/routes.routes";

export const MODELOS_SIDEBAR: ISidebarData = {
    icon: faFile,
    secionName:'Modelos',
    options: [
        {
            nombre: 'Modelo 1',
            link: MODELOS_ROUTES.MODEL1
        },
        {
            nombre: 'Modelo 2',
            link: MODELOS_ROUTES.MODEL2
        }
    ]
}

export const PLANTILLA_SIDEBAR: ISidebarData = {
    icon: faUsers,
    secionName:'Plantilla',
    options: [
        {
            nombre: 'Trabajadores',
            link: PLANTILLA_ROUTES.TRABAJADORES
        },
        {
            nombre: 'P2',
            link: PLANTILLA_ROUTES.P2
        }
    ]
}

export const SISTEMA_SIDEBAR: ISidebarData = {
    icon: faCog,
    secionName:'Sistema',
    options: [
        {
            nombre: 'Unidades',
            link: SISTEMA_ROUTES.UNIDADES
        },
        {
            nombre: 'Escalas salariales',
            link: SISTEMA_ROUTES.ESCALAS
        },
        {
            nombre: 'Cargos',
            link: SISTEMA_ROUTES.CARGOS
        },
        {
            nombre: 'Categoría ocupacional',
            link: SISTEMA_ROUTES.CAT_OCUP
        },
        {
            nombre: 'Categoría docente',
            link: SISTEMA_ROUTES.CAT_DOC
        },
        {
            nombre: 'CLA',
            link: SISTEMA_ROUTES.CLA
        },
        {
            nombre: 'Usuarios',
            link: SISTEMA_ROUTES.USUARIOS
        }
    ]
}
