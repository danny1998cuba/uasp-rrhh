// Plantillas routes
export const PLANTILLA_ROOT = 'plantilla'

export const PLANTILLA_CHILDREN = {
    TRABAJADORES: 'trabajador',
    UNIDAD: 'trabajador/unidad',
    FILTERS: 'trabajador/filters'
}

export const PLANTILLA_ROUTES = {
    TRABAJADORES: `${PLANTILLA_ROOT}/${PLANTILLA_CHILDREN.TRABAJADORES}`,
    UNIDAD: `${PLANTILLA_ROOT}/${PLANTILLA_CHILDREN.UNIDAD}`,
    FILTERS: `${PLANTILLA_ROOT}/${PLANTILLA_CHILDREN.FILTERS}`
}

// Modelos routes
export const MODELOS_ROOT = 'modelos'

export const MODELOS_CHILDREN = {
    GRUPO_ESCALA: 'grupo_escala',
    APROB: 'aprob_cub',
    P2: 'p2',
    DATABASE: 'database',
    AUSENTISMO: 'ausentismo',
    SITUACION: 'situacion_laboral',
    OMEI1: 'modelos_omei'
}

export const MODELOS_ROUTES = {
    GRUPO_ESCALA: `${MODELOS_ROOT}/${MODELOS_CHILDREN.GRUPO_ESCALA}`,
    APROB: `${MODELOS_ROOT}/${MODELOS_CHILDREN.APROB}`,
    P2: `${MODELOS_ROOT}/${MODELOS_CHILDREN.P2}`,
    DATABASE: `${MODELOS_ROOT}/${MODELOS_CHILDREN.DATABASE}`,
    AUSENTISMO: `${MODELOS_ROOT}/${MODELOS_CHILDREN.AUSENTISMO}`,
    SITUACION: `${MODELOS_ROOT}/${MODELOS_CHILDREN.SITUACION}`,
    OMEI1: `${MODELOS_ROOT}/${MODELOS_CHILDREN.OMEI1}`
}

// Sistema routes
export const SISTEMA_ROOT = 'sistema'

export const SISTEMA_CHILDREN = {
    CARGOS: 'cargos',
    UNIDADES: 'unidades',
    ESCALAS: 'escalas',
    CAT_OCUP: 'catocup',
    CAT_DOC: 'catdoc',
    NIVEL: 'niveles',
    CLA: 'cla',
    USUARIOS: 'usuarios',
}

export const SISTEMA_ROUTES = {
    CARGOS: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CARGOS}`,
    UNIDADES: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.UNIDADES}`,
    ESCALAS: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.ESCALAS}`,
    CAT_OCUP: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CAT_OCUP}`,
    CAT_DOC: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CAT_DOC}`,
    NIVEL: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.NIVEL}`,
    CLA: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CLA}`,
    USUARIOS: `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.USUARIOS}`,
}

// Sesion routes
export const SESION_ROOT = 'sesion'
export const _403_ROOT = '403'

// Login routes
export const LOGIN_ROUTE = 'login'

export const SITE_ROOT = 'dashboard'