import { useEffect, useState } from 'react';
import './styles.css'
import { tpPackagePost } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { ModalAdd } from './ModalAdd';
import { ModalUpdate } from './ModalUpdate';

export function Packages() {
    
    const [packages, setPackage] = useState<tpPackagePost[]>([])

    const deletePackage = async (code: string) => {
        try {
            const response = await axios.delete(`${url}/packages`, {
                data:{
                    code: code
                }
            });
            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la agencia
                setPackage(packages.filter(package1 => package1.code !== code));
                console.log('Oferta de Hotel eliminada con éxito');
            }else {
                console.error('Error al eliminar la agencia');
            }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };


    const fetchPackages = async () => {
        const packages = await axios.get<tpPackagePost[]>(`${url}/packages`);
        setPackage(packages.data)
    }

    useEffect(() => {
        fetchPackages();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Paquetes</h1>
                </div>
                <ModalAdd fetchentity={fetchPackages}/>
                <ul className="list-group mt-3">
                    {packages.map((package1, index) => (
                        <li key={index} className="list-group-item list-group-element">
                            <div>
                                <h5 className="mb-1">{package1.name}</h5>
                                <small>{package1.description}</small>
                            </div>
                            <div>
                                <ModalUpdate package1={package1}/>
                                <button type="button" className="btn btn-danger" onClick={() => deletePackage(package1.code)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
