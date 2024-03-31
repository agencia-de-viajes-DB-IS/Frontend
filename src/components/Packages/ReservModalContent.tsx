import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpPackage } from '../../types/types';



function PackageReservModalContent(package1:tpPackage) {

    // Aerolinea seleccionada por el usuario
    const [airlines, setAirlines] = useState<string[]>([
        "Cubana de Aviación",
        "Five Stars Airlines",
        "Vuela Lejos Airline"
    ]);

    // Estado para controlar la lista de campos de entrada
    const [tourists, setTourists] = useState([{ 
        firstName: "",
        lastName: "",
        nacionality: "",
        ci: ""
    }]);

    // Función para manejar la adición de un nuevo turista
    const addTourist = () => {
        setTourists([...tourists, { 
            firstName: "",
            lastName: "",
            nacionality: "",
            ci: ""
        }]);
    };

    // Función para manejar la eliminacion del ultimo turista
    const removeLastTourist = () => {
        // Crear una copia del array actual de tourists
        const updatedTourists = [...tourists];
        // Eliminar el último elemento del array
        updatedTourists.pop();
        // Actualizar el estado con el nuevo array
        setTourists(updatedTourists);
    };

    // Función para manejar el cambio en los campos de entrada
    const handleTouristChange = (index:number, propierty:string, value:string) => {
        const values = [...tourists];

        switch (propierty) {
            case "firstName":
                values[index].firstName = value;
                break;
            case "lastName":
                values[index].lastName = value;
                break;
            case "nacionality":
                values[index].nacionality = value;
                break;
            case "ci":
                values[index].ci = value;
                break;
            default:
                break;
        }
        
        setTourists(values);
    };

    const handleSubmit = () => {
        console.log("tourists")
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                 <div className="input-group form-group">
                 <select
                    className="form-control mb-3 border border-secondary"
                    placeholder="Aerolínea"
                    name="airline"
                >
                    {airlines.map((airline, index) => (
                        <option key={index} value={airline}>
                            {airline}
                        </option>
                    ))}
                </select>
                </div>

                {tourists.map((_, index) => (
                    <div className="tourist-info">
                        <label className='label-tourist'>Turista {index+1}</label>
                        <div className="input-group form-group">
                            <input
                                type="text" 
                                className="form-control mb-3 border border-secondary" 
                                placeholder="Nombre"
                                name="firstName"
                                onChange={({target}) => handleTouristChange(index, "firstName", target.value)}
                            /> 
                        </div>
                        <div className="input-group form-group">
                            <input
                                type="text" 
                                className="form-control mb-3 border border-secondary" 
                                placeholder="Apellidos"
                                name="lastName"
                                onChange={({target}) => handleTouristChange(index, "lastName", target.value)}
                            /> 
                        </div>
                        <div className="input-group form-group">
                            <input
                                type="text" 
                                className="form-control mb-3 border border-secondary" 
                                placeholder="Nacionalidad"
                                name="nacionality"
                                onChange={({target}) => handleTouristChange(index, "nacionality", target.value)}
                            /> 
                        </div>
                        <div className="input-group form-group">
                            <input 
                                type="ci" 
                                className="form-control mb-3 border border-secondary" 
                                placeholder="Carnet de Identidad"
                                name="ci"
                                onChange={({target}) => handleTouristChange(index, "ci", target.value)}
                            />
                        </div>
                    </div>
                ))}
                
                <div className='d-flex justify-content-around mb-4'>
                    <button type="button" onClick={addTourist} className="btn btn-primary">Agregar turista</button>
                    <button type="button" onClick={removeLastTourist} className="btn btn-danger">Eliminar último turista</button>
                </div>
                

                <div className="form-group d-flex flex-column align-items-center">
                    <input type="submit" value="Reservar" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    );
}

export default PackageReservModalContent;