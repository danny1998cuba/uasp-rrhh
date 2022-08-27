import { environment as env } from "src/environments/environment";

// Base Routes
const BASE_ROUTE = `${env.uri}`
const API_ROUTE = `${BASE_ROUTE}api`

export const LOGIN_ROUTES = {
    LOGIN: `${BASE_ROUTE}login`,
    LOGOUT: `${BASE_ROUTE}logout`,
    ACTIVE_USER: `${BASE_ROUTE}userAuth`
}

// Controllers Routes
export const GESTION_ROUTES = {
    CARGO: `${API_ROUTE}/cargo`,
    CAT_DOC: `${API_ROUTE}/catDoc`,
    CAT_OCUP: `${API_ROUTE}/catOcup`,
    CLA: `${API_ROUTE}/cla`,
    DEPARTAMENTO: `${API_ROUTE}/departamento`,
    DEPARTAMENTO_CARGO: `${API_ROUTE}/departamento_cargo`,
    DEPARTAMENTO_CARGO_DISP: `${API_ROUTE}/departamento_cargo/disponibilidad`,
    ESCALA: `${API_ROUTE}/escala`,
    NIVEL_ESCOLAR: `${API_ROUTE}/escolaridad`,
    ROL: `${API_ROUTE}/rol`,
    TRABAJADOR: `${API_ROUTE}/trabajador`,
    TRABAJADOR_FILTER: `${API_ROUTE}/trabajador/filter`,
    UNIDAD: `${API_ROUTE}/unidad`,
    USERS: `${API_ROUTE}/usuario`
}

// Reports Routes
export const REPORTS_BASE = `${API_ROUTE}/reports`

export const REPORTS = {
    FILTERED: `${REPORTS_BASE}/filtered`,
    P2: `${REPORTS_BASE}/p2`,
    PLANTILLA_AC: `${REPORTS_BASE}/plantillaAC`,
    UNIDAD: `${REPORTS_BASE}/unidad`
}


export const COUNT = '/count'

export const PASS_ROUTE = `${GESTION_ROUTES.USERS}/pass`

// Connectors
export const CONNECTORS = {
    PARAMS: '?',
    AND: '&'
}

export const DEP_BY_UNIDAD = `${GESTION_ROUTES.DEPARTAMENTO}${CONNECTORS.PARAMS}unidad=`