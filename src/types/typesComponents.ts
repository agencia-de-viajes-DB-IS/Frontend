import { ReactNode } from "react"
import { tpAgency, tpUser } from "./types"

export interface UsersProps {
    data: Array<tpUser>
}
export interface DashboardProps {
    children: ReactNode,
    selected: (op: number) => void
}
export interface UsersProps {
    data: Array<tpUser>
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