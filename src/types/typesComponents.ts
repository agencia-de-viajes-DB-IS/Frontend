import { ReactNode } from "react"
import { tpAgency } from "./types"


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

export interface tpToken {
    role:string
}