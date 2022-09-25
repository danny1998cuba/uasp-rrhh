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
                    nombre: 'Plantilla aprobada y cubierta',
                    link: MODELOS_ROUTES.APROB,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Plantilla de cargo y registro de trabajadores (P2)',
                    link: MODELOS_ROUTES.P2,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Modelo Grupo - Escala',
                    link: MODELOS_ROUTES.GRUPO_ESCALA,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                }
            ]
        },
        {
            title: 'Mensuales',
            options: [
                {
                    nombre: 'Resumen de trabajadores y salario',
                    link: MODELOS_ROUTES.DATABASE,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Ausentismo',
                    link: MODELOS_ROUTES.AUSENTISMO,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Situación laboral de los RRHH',
                    link: MODELOS_ROUTES.SITUACION,
                    img: 'assets/images/models_banner.png',
                    description: 'Description',
                    show: true
                }
            ]
        },
        {
            title: 'OMEI',
            options: [
                {
                    nombre: 'Formularios Sigelite',
                    link: MODELOS_ROUTES.OMEI1,
                    img: 'assets/images/sige_banner.png',
                    description: 'Description',
                    show: true
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
                    link: PLANTILLA_ROUTES.TRABAJADORES,
                    img: 'assets/images/users_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Trabajadores por unidad',
                    link: PLANTILLA_ROUTES.UNIDAD,
                    img: 'assets/images/users_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Búsqueda avanzada',
                    link: PLANTILLA_ROUTES.FILTERS,
                    img: 'assets/images/users_banner.png',
                    description: 'Description',
                    show: true
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
                    link: SISTEMA_ROUTES.UNIDADES,
                    img: 'assets/images/unidades_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Cargos',
                    link: SISTEMA_ROUTES.CARGOS,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Escalas salariales',
                    link: SISTEMA_ROUTES.ESCALAS,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Categoría ocupacional',
                    link: SISTEMA_ROUTES.CAT_OCUP,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Categoría docente',
                    link: SISTEMA_ROUTES.CAT_DOC,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Nivel escolar',
                    link: SISTEMA_ROUTES.NIVEL,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Condiciones laborales adicionales',
                    link: SISTEMA_ROUTES.CLA,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                },
                {
                    nombre: 'Usuarios',
                    link: SISTEMA_ROUTES.USUARIOS,
                    img: 'assets/images/system_banner.png',
                    description: 'Description',
                    show: true
                }
            ]
        }
    ]
}
