import { faCog, faFile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { ISidebarData } from "src/app/shared/components/sidebar/sidebar.metadata";
import { MODELOS_ROOT, MODELOS_ROUTES, PLANTILLA_ROOT, PLANTILLA_ROUTES, SISTEMA_ROOT, SISTEMA_ROUTES } from "./routes/routes.routes";

export const MODELOS_SIDEBAR: ISidebarData = {
    icon: faFile,
    secionName: 'Modelos',
    rootLink: '/' + MODELOS_ROOT,
    groups: [
        {
            title: 'Plantilla',
            options: [
                {
                    nombre: 'Modelo Grupo - Escala',
                    link: MODELOS_ROUTES.GRUPO_ESCALA
                }
            ]
        },
        {
            title: 'Mensuales',
            options: [
                {
                    nombre: 'Resumen de trabajadores y salario',
                    link: MODELOS_ROUTES.DATABASE
                },
                {
                    nombre: 'Ausentismo',
                    link: MODELOS_ROUTES.AUSENTISMO
                },
                {
                    nombre: 'Situación laboral de los RRHH',
                    link: MODELOS_ROUTES.SITUACION
                }
            ]
        },
        {
            title: 'Estadísticas',
            options: [
                {
                    nombre: 'OMEI 1',
                    link: MODELOS_ROUTES.OMEI1
                },
                {
                    nombre: 'OMEI 2',
                    link: MODELOS_ROUTES.OMEI2
                }
            ]
        }
    ]
}

export const PLANTILLA_SIDEBAR: ISidebarData = {
    icon: faUsers,
    secionName: 'Plantilla',
    rootLink: '/' + PLANTILLA_ROOT,
    groups: [
        {
            options: [
                {
                    nombre: 'Gestión de trabajadores',
                    link: PLANTILLA_ROUTES.TRABAJADORES
                },
                {
                    nombre: 'Plantilla aprobada y cubierta',
                    link: PLANTILLA_ROUTES.APROB
                },
                {
                    nombre: 'Trabajadores por unidad',
                    link: PLANTILLA_ROUTES.UNIDAD
                },
                {
                    nombre: 'Búsqueda avanzada',
                    link: PLANTILLA_ROUTES.FILTERS
                },
                {
                    nombre: 'Plantilla de cargo y registro de trabajadores',
                    link: PLANTILLA_ROUTES.P2
                }
            ]
        }
    ]
}

export const SISTEMA_SIDEBAR: ISidebarData = {
    icon: faCog,
    secionName: 'Sistema',
    rootLink: '/' + SISTEMA_ROOT,
    groups: [
        {
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
    ]
}
