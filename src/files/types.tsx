export interface tpResponse {
    success: boolean,
    error: unknown,
    data: unknown,
    dataType: string,
    errorMessage: string
}

export interface tpUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface tpExcursions {
    desde: string,
    hasta: string,
    precio: string,
    foto: string,
    nombre: string
}