import { useEffect, useState } from "react";
import './styles.css' 
import { DashboardAgente } from "./DashboardAgente";
import axios from "axios";
import { url } from "../../helper/server";
import { Button, Modal } from "react-bootstrap";
import ExcursionFormAgente from "../../components/Excursions/ExcursionFormAdd";
// import { ExcursionListAgente } from "../../components/Excursions/ExcursionListAgente";
 
export interface Main {
    $id:     string;
    $values: Value[];
}

export interface Value {
    $id:         string;
    location:    string;
    price:       number;
    arrivalDate: Date;
    agency:      Agency;
}

export interface Agency {
    $id:       string;
    name:      Name;
    address:   Address;
    faxNumber: number;
    email:     Email;
}

export enum Address {
    BaracoaGuantánamo = "Baracoa, Guantánamo",
    PlayaHabana = "Playa, Habana",
    VaraderoMatanzas = "Varadero, Matanzas",
    VedadoHabana = "Vedado, Habana",
    ViñalesPinarDelRío = "Viñales, Pinar del Río",
}

export enum Email {
    CaribeGmailCOM = "caribe@gmail.com",
    CubaWildGmailCOM = "cubaWild@gmail.com",
    EastHeightsGmailCOM = "eastHeights@gmail.com",
    LlaveGmailCOM = "llave@gmail.com",
    ParadiseGmailCOM = "paradise@gmail.com",
    VerdeCubaGmailCOM = "verdeCuba@gmail.com",
}

export enum Name {
    CaribeResorts = "Caribe Resorts",
    CubaVerde = "Cuba Verde",
    EastHeights = "East Heights",
    GreenParadise = "Green Paradise",
    LlaveDelGolfo = "Llave del Golfo",
    WildCuba = "Wild Cuba",
}


export const AgenteExcursion = () => {
    const [data, setData] = useState<Agency[]>([])
    // const users: tpUser[] = [
    //     { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password1" },
    //     { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password2" },
    //     { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", password: "password3" },
    //     { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", password: "password4" },
    //     { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", password: "password5" },
    // ];
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const add = () => {

    }

    useEffect(() => {
        const api = async () => {
            const user = await axios.get<Value>(`${url}/users`);
            console.log(user) 

        }
        api();
    }, []);

    return (
        <>
            <DashboardAgente>
            <Button className="text-black bg-red btn-register" variant="" onClick={handleShow}>
                Agregar
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionFormAgente onSubmit={() => add()}/>
                </Modal.Body>
            </Modal>
            </DashboardAgente>

            {/* <ExcursionListAgente data={[]}/> */}
        </>
    )
}