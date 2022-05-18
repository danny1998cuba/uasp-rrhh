export const PLANTILLA_ROOT = 'plantilla'
export const MODELOS_ROOT = 'modelos'
export const SISTEMA_ROOT = 'sistema'
export const SESION_ROOT = 'sesion'

export const PLANTILLA_CHILDREN = {
    TRABAJADORES : 'trabajador',
    P2 : 'p2'
}

export const MODELOS_CHILDREN = {
    MODEL1 : 'model1',
    MODEL2 : 'model2'
}

export const SISTEMA_CHILDREN = {
    CARGOS : 'cargos',
    UNIDADES : 'unidades',
    ESCALAS : 'escalas',
    CAT_OCUP : 'catocup',
    CAT_DOC : 'catdoc',
    CLA : 'cla',
    USUARIOS : 'usuarios',
}

export const PLANTILLA_ROUTES = {
    TRABAJADORES : `${PLANTILLA_ROOT}/${PLANTILLA_CHILDREN.TRABAJADORES}`,
    P2 : `${PLANTILLA_ROOT}/${PLANTILLA_CHILDREN.P2}`
}

export const MODELOS_ROUTES = {
    MODEL1 : `${MODELOS_ROOT}/${MODELOS_CHILDREN.MODEL1}`,
    MODEL2 : `${MODELOS_ROOT}/${MODELOS_CHILDREN.MODEL2}`
}

export const SISTEMA_ROUTES = {
    CARGOS : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CARGOS}`,
    UNIDADES : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.UNIDADES}`,
    ESCALAS : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.ESCALAS}`,
    CAT_OCUP : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CAT_OCUP}`,
    CAT_DOC : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CAT_DOC}`,
    CLA : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.CLA}`,
    USUARIOS : `${SISTEMA_ROOT}/${SISTEMA_CHILDREN.USUARIOS}`,
}

