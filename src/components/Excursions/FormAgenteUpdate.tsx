// Importa los módulos necesarios
import React, { useState, useEffect } from 'react';

// Define la interfaz para los datos del formulario
interface FormData {
 location: string;
 price: number;
 arrivalDate: string;
}

// Define la interfaz para las props del componente
interface EditFormComponentUpdateProps {
 initialData: FormData; // Los datos iniciales son obligatorios para la edición
 onSubmit: (data: FormData) => void; // Función para manejar el envío del formulario
}

// Componente de formulario para editar
const ExcursionFormAgenteUpdate: React.FC<EditFormComponentUpdateProps> = ({ initialData, onSubmit }) => {
 // Estado para los datos del formulario
 const [formData, setFormData] = useState<FormData>({
    location: initialData.location,
    price: initialData.price,
    arrivalDate: initialData.arrivalDate,
 });

 // Función para manejar los cambios en los campos del formulario
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 // Función para enviar los datos actualizados al servidor
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función onSubmit pasada como prop
 };

 // Actualiza el estado inicial si los datos iniciales cambian
 useEffect(() => {
    setFormData({
      location: initialData.location,
      price: initialData.price,
      arrivalDate: initialData.arrivalDate,
    });
 }, [initialData]);

 return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Arrival Date:
        <input
          type="datetime-local"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
 );
};

export default ExcursionFormAgenteUpdate;