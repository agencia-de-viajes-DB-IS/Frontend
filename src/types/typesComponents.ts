import { ReactNode } from "react"
import { UsersGet, tpAgency } from "./types"

export interface UsersProps {
    data: Array<UsersGet>
}
export interface DashboardProps {
    children: ReactNode,
} 
export interface AgenciesProps {
    data: Array<tpAgency>
}

export interface CardProps {
    name: string
}

export interface ModalShowProps {
    onClose: () => void; // Esta función se utilizará para cerrar el modal
}