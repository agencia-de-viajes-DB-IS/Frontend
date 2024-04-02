import { ReactNode } from "react"
import { tpAgency, tpTourist } from "./types"


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
    role:string,
    agencyId?: string,
    sub: string
}

export interface ModalProps {
    fetchentity: () => void;
}

export interface FormProps {
    fetchentity: () => void;
    onClose: () => void;
}

export interface FormPropsTourist {
    fetchentity: () => void;
    onClose: () => void;
    tourist:tpTourist;
}

export interface tpRol {
    id: string,
    name: string
}