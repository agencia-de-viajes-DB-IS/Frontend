import { ReactNode } from "react"

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
export interface Login {
    $id: string,
    email: string,
    token: string,
}
export interface Register {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
export interface UsersGet {
    firstName: string,
    lastName: string,
    email: string,
}
export interface AgenciaC {
    Name: string,
    Address: string,
    FaxNumber: string,
    Email: string
}
export interface Excursions {
    Name: string,
    Address: string,
    FaxNumber: string,
    Email: string
}
export interface Packages {
    Name: string,
    Address: string,
    FaxNumber: string,
    Email: string
}
export interface UsersProps {
    data: Array<tpUser>
}
export interface DashboardProps {
    children: ReactNode
}
export interface UsersProps {
    data: Array<tpUser>
}