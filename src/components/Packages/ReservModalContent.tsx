import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpAirlines, tpPackage, tpTourist } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { MyMultiSelect, MySelect } from '../MyComponents/MultiSelect';
import { json } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function PackageReservModalContent(package1:tpPackage) {

    const token = localStorage.getItem('userToken')

    // Aerolinea seleccionada por el usuario
    const [airlines, setAirlines] = useState<tpAirlines[]>([]);
    const [selectedAirline, setSelectedAirline] = useState<string>("");

    // Estado para controlar la lista de campos de entrada
    const [tourists, setTourists] = useState<tpTourist[]>();
    const [selectedTourists, setSelectedTourists] = useState([""])


    useEffect(() => {
        axios.get<tpAirlines[]>(`${url}/airlines`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
         })
         .then(response => {
            // Suponiendo que la respuesta es un array de strings
            setAirlines(response.data);
         })
         .catch(error => {
            console.error('Error al obtener las airlines:', error);
        });
    }, []);


    const handleSelectedTourist = (newSelectedTourists:string[]) => {

        // Buscar la aerolinea por su nombre
        const airlineId = airlines.find(e => e.name = selectedAirline);

        const selected = newSelectedTourists.map(e => JSON.parse(e).ci);


        const reservationDate = new Date();

        


    }


    

    const handleSubmit = () => {
        console.log("reserv")
        console.log()
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="input-group form-group">
                    <MySelect options={airlines.map(e => e.name)} setSelectedItem={setSelectedAirline}/>
                </div>

                <div className="input-group form-group w-100">
                    <MyMultiSelect options={tourists.map(e => JSON.stringify({nombre:`${e.firstName}`, ci:`${e.ci}`}))} setSelectedData={(newSelectedTourists) => handleSelectedTourist(newSelectedTourists)}/>
                </div>
                
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