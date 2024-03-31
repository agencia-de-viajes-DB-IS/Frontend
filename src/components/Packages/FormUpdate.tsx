import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpPackage, tpExcursion } from '../../types/types';
import { MyMultiSelect, MySelect } from '../MyComponents/MultiSelect';

interface PackageFormUpdateProp {
  package1: tpPackage;
  onClose: () => void;
}

export function PackageForm({package1 , onClose}: PackageFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>(package1.name);
  const [price, setPrice] = useState<string>(package1.price.toString());
  const [arrivalDate, setArrivalDate] = useState<string>(package1.arrivalDate);
  const [departureDate, setDepartureDate] = useState<string>(package1.departureDate);
  const [description, setDescription] = useState<string>(package1.description)


  // Obtener la agencia del paquete
  const agency = package1.extendedExcursionIds[0].agency
  // Manejar las agencias
  const [agencies, setAgencies] = useState<tpAgency[]>([]);
  const [selectedAgencyName, setSelectedAgencyName] = useState<string>(agency.name);
  
  // Manejar las excursiones prolongadas
  const [excursions, setExcursions] = useState<tpExcursion[]>([]);
  const [selectedExcursionNames, setSelectedExcursionNames] = useState<string[]>();
  
  useEffect(() => {
    // Recibir las agencias del servidor
    const fetchAgencies = async () => {
        try {
            const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');            
            setAgencies([{
              id:"qw",
              name:'Agencias',
              address:"",
              faxNumber:0,
              email:"a@a"
            }, ...response.data]);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    // Recibir las excursiones prolongadas del servidor
    const fetchExcursions = async () => {
      try {
          const response = await axios.get<tpExcursion[]>('http://localhost:5000/excursions');
          setExcursions(response.data);
      } catch (error) {
          console.error('Error fetching excursions:', error);
      }
  };

  fetchAgencies();
  fetchExcursions();
}, []);

  const handleSubmit = () => {
    console.log('voy a editar esta package1');
    console.log(package1);
    
    onClose();
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Precio"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Fecha de Salida"
          name="arrivalDate"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Fecha de Llegada"
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <MySelect options={agencies.map(e => e.name)} setSelectedItem={setSelectedAgencyName}/>
      </div>
      {selectedAgencyName && 
        <div className="input-group form-group w-100">
          <MyMultiSelect options={excursions.filter(e => e.agency.name === selectedAgencyName).map(e => e.name)} setSelectedData={(newSelectedExcursionNames) => setSelectedExcursionNames(newSelectedExcursionNames)}/>
        </div>
      }
      <div className="input-group form-group">
        <textarea
          className="form-control mb-3 border border-secondary"
          placeholder="Descripción"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Editar" className="btn btn-dark" />
      </div>
    </form>
  );
}

