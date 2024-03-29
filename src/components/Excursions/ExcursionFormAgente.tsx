// Importa los módulos necesarios
import React, { useState } from 'react';

// Define la interfaz para los datos del formulario
interface FormData {
 location: string;
 price: number;
 arrivalDate: string;
}

interface EditFormComponentProps {
  onSubmit: (data: FormData) => void; // Función para manejar el envío del formulario
}
 
// Componente de formulario
const ExcursionFormAgente: React.FC<EditFormComponentProps> = ({onSubmit}) => {
 // Estado para los datos del formulario
 const [formData, setFormData] = useState<FormData>({
    location: '',
    price: 0,
    arrivalDate: '',
 });

 // Función para manejar los cambios en los campos del formulario
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 // Función para enviar los datos al servidor
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar los datos al servidor
    if (onSubmit) {
        onSubmit(formData);
    }
 };

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

export default ExcursionFormAgente;
