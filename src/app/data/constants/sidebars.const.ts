import { faCog, faFile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { ISidebarData } from "src/app/shared/components/sidebar/sidebar.metadata";
import { MODELOS_ROOT, MODELOS_ROUTES, PLANTILLA_ROOT, PLANTILLA_ROUTES, SISTEMA_ROOT, SISTEMA_ROUTES } from "./routes/routes.routes";

export const MODELOS_SIDEBAR: ISidebarData = {
    icon: faFile,
    secionName: 'Modelos',
    rootLink: '/' + MODELOS_ROOT,
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
    secionName: 'Plantilla',
    rootLink: '/' + PLANTILLA_ROOT,
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
    secionName: 'Sistema',
    rootLink: '/' + SISTEMA_ROOT,
    options: [
        {
            nombre: 'Unidades',
            link: SISTEMA_ROUTES.UNIDADES
        },
        {
            nombre: 'Cargos',
            link: SISTEMA_ROUTES.CARGOS
        },
        {
            nombre: 'Asignación de plazas',
            link: SISTEMA_ROUTES.PLAZAS
        },
        {
            nombre: 'Escalas salariales',
            link: SISTEMA_ROUTES.ESCALAS
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
            nombre: 'Nivel escolar',
            link: SISTEMA_ROUTES.NIVEL
        },
        {
            nombre: 'Condiciones laborales adicionales',
            link: SISTEMA_ROUTES.CLA
        },
        {
            nombre: 'Usuarios',
            link: SISTEMA_ROUTES.USUARIOS
        }
    ]
}
