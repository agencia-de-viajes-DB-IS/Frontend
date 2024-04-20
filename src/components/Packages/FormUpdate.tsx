import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpExtendedExcursionGet, tpFacility, tpPackageGet } from '../../types/types';
import { MyMultiSelect } from '../MyComponents/MultiSelect';
import { tpToken } from '../../types/typesComponents';
import { url } from '../../helper/server';
import { jwtDecode } from 'jwt-decode';

interface PackageFormUpdateProp {
  package1: tpPackageGet;
  onClose: () => void;
  fetchentity: () => void;
}

export function FormUpdate({ package1, onClose, fetchentity }: PackageFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>(package1.name);
  const [price, setPrice] = useState<number>(package1.price);
  const [description, setDescription] = useState<string>(package1.description)
  const [capacity, setCapacity] = useState<number>(package1.capacity)

  // Manejar las excursiones prolongadas
  const [excursions, setExcursions] = useState<tpExtendedExcursionGet[]>([]);
  const [selectedExcursionNames, setSelectedExcursionNames] = useState<string[]>(package1.extendedExcursions.map(e => e.name));

  const [facilities, setFacilities] = useState<tpFacility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(package1.facilities.map(e => e.name));


  useEffect(() => {
    const token = localStorage.getItem('userToken');

    // Recibir las facilidades del servidor
    const fetchFacilities = async () => {
      try {
        const response = await axios.get<tpFacility[]>('http://localhost:5000/facilities', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    // Recibir las excursiones prolongadas del servidor
    const fetchExcursions = async () => {
      if (!token) {
        return
      }
      const decodedToken:tpToken = jwtDecode(token)
      const agencyId = decodedToken.agencyId

      try {
        const response = await axios.get<tpExtendedExcursionGet[]>('http://localhost:5000/extended/excursions');
        const excursionAgency = response.data.filter(e => e.agency.id === agencyId)
        console.log(response.data)
        setExcursions(excursionAgency);
      } catch (error) {
        console.error('Error fetching excursions:', error);
      }
    };

    fetchFacilities();
    fetchExcursions();
  }, []);


  const handleSubmit = async () => {

    const token = localStorage.getItem('userToken');

    const facilityIds = facilities
      .filter(facility => selectedFacilities.includes(facility.name))
      .map(facility => facility.id);

    const extendedExcursionIds = excursions
      .filter(excursion => selectedExcursionNames.includes(excursion.name))
      .map(excursion => excursion.id);

    const code = package1.code;
    const data = { code, name, description, price, capacity, facilityIds, extendedExcursionIds };
    console.log(data)
    console.log(token);

    try {
      const response = await axios.put(`${url}/packages`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    fetchentity();
    onClose();
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Nombre</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Pack Turismo Salvaje"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Precio</label>
        <input
          type="number"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: 100"
          name="price"
          value={price}
          onChange={({ target }) => setPrice(parseInt(target.value, 10))}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Capacidad</label>
        <input
          type="number"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: 100"
          name="capacity"
          value={capacity}
          onChange={({ target }) => setCapacity(parseInt(target.value, 10))}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Facilidades</label>
        <MyMultiSelect options={facilities.map(e => e.name)} setSelectedData={(newSelectedFacilities) => setSelectedFacilities(newSelectedFacilities)} selectedIds={selectedFacilities} />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Excursiones</label>
        <MyMultiSelect options={excursions.map(e => e.name)} setSelectedData={(newSelectedExcursions) => setSelectedExcursionNames(newSelectedExcursions)} selectedIds={selectedExcursionNames}/>
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Descripción</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Excursiones peligrosas que te harán sudar adrenalina ..."
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Guardar" className="btn btn-dark login_btn" />
      </div>
    </form>
  );
}

