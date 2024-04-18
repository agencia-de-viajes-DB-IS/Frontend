import { useEffect, useState } from 'react';
import './styles.css'
import { tpAirlines, tpExcursion, tpTourist } from '../../types/types';
import { url } from '../../helper/server';
import axios from 'axios';
import Select from 'react-select/base';
import { jwtDecode } from 'jwt-decode';
import { MyMultiSelect, MySelect } from '../MyComponents/MultiSelect';
import { tpToken } from '../../types/typesComponents';

interface ExcursionReservModalContentProps {
    excursion:tpExcursion
}

function ExcursionReservModalContent({excursion}: ExcursionReservModalContentProps) {

    // Aerolinea seleccionada por el usuario
    const [airlines, setAirlines] = useState<tpAirlines[]>([]);
    const [selectedAirline, setSelectedAirline] = useState<string>();

    const [tourists, setTourists] = useState<tpTourist[]>([]);
    const [selectedTourists, setSelectedTourists] = useState<string[]>([]);


    const token = localStorage.getItem('userToken');

    // Función para decodificar el token y obtener el userId
    function decodeToken(token: string | null): string {
        try {
            if (token) {
                const decodedToken:tpToken = jwtDecode(token);
                return decodedToken.sub;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return '';
        }
        return ''
   }

    useEffect(() => {
        axios.get<tpAirlines[]>(`${url}/airlines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Asumiendo que la respuesta es un array de strings (nombres de las aerolíneas)
            setAirlines(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las aerolíneas:', error);
        });

        axios.get<tpTourist[]>(`${url}/users/tourists`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Asumiendo que la respuesta es un array de objetos con al menos un campo 'name'
            setTourists(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los turistas:', error);
        });
    }, []); 
    
    
    const handleSubmit = async () => {
        
        // id de la airline seleccionada
        const airlineId = airlines.find(e => e.name === selectedAirline)?.id

        // Array de los turistas seleccionados para la reservacion
        const touristsCIs = selectedTourists.map(e => e.slice(-11))

        // Array con los id de los id de los turistas seleccionados
        const touristsGuids = touristsCIs.map(ci => {
            const tourist = tourists.find(t => t.ci === ci);
            return tourist ? tourist.touristID : null;
        });

        // id del usuario
        const userId = decodeToken(token);

        // fecha actual
        const currentDate = new Date().toISOString();
        

        const data = {
            excursionId:excursion.id,
            price:excursion.price,
            reservationDate: currentDate,
            airlineId,
            touristsGuids,
            userId,
         };

         console.log(data);
         
        
         try {
            const response = await axios.post(`${url}/reservation/excursion`, data, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
        
            console.log('Reserva realizada con éxito:', response.data);
         } catch (error) {
            console.error('Error realizando la reserva:', error);
         }
        }


    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className="input-group form-group d-flex flex-column">
                    <label htmlFor="">Agencia</label>
                    <MySelect options={airlines.map(e => e.name)} setSelectedItem={setSelectedAirline}/>
                </div>
                <div className="input-group form-group w-100 d-flex flex-column">
                    <label htmlFor="">Mis turistas</label>
                    <MyMultiSelect options={tourists.map(e => e.firstName + " " + e.lastName + " : " + e.ci)} setSelectedData={(newSelectedTouristssNames) => setSelectedTourists(newSelectedTouristssNames)}/>
                </div>
                <div className="form-group d-flex flex-column align-items-center">
                    <input type="submit" value="Reservar" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    );
}

export default ExcursionReservModalContent;