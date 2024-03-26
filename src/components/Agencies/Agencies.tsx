import { useEffect, useState } from 'react';
import { AgenciesProps } from '../../types/typesComponents'
import './styles.css'
import { AgencyGet } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import AgencyModalAdmin from './AgencyModalAdmin';
import { Modal } from 'react-bootstrap';
import AgencyFormUpdate from './AgencyFormUpdate';

export const Agencies: React.FC<AgenciesProps> = ({data}) => {
    const [agencies, setAgencies] = useState<AgencyGet[]>([])
    const [update, setUpdate] = useState<AgencyGet>()

    // Función para enviar los datos al servidor
    // Función para enviar los datos al servidor
    const del = async (id: number) => {
        const data = { id: `${id}`};
        console.log(data)
        try {
        const response = await fetch(`${url}/agencies`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }
        setAgencies(agencies.filter(agency => agency.id !== id));
        console.log('Datos enviados con éxito');
        } catch (error) {
        console.error('Error:', error);
        }
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    useEffect(() => {
        const api = async () => {
            const agencies = await axios.get<AgencyGet>(`${url}/agencies`);
            setAgencies(agencies.data)
            console.log(agencies)
        }
        api();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h3>Agencias</h3>
                </div>
                <AgencyModalAdmin/>
                <ul className="list-group">
                    {agencies.map((ag, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{ag.name}</h5>
                                <small>{ag.email}</small>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary me-2" onClick={() => {
                                    setUpdate(ag)
                                    handleShow()
                                }}>Editar</button>
                                <button type="button" className="btn btn-danger" onClick={() => del(ag.$id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {update && <AgencyFormUpdate agency={update} />}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
