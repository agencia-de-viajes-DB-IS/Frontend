import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import './styles.css';

interface SelectProps {
  options: string[];
  setSelectedItem: (arg: string) => void;
  defaultValue?: string; // Añadir esta propiedad para recibir el ID seleccionado
}

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: string[];
  setSelectedData: (arg: string[]) => void;
  selectedIds?: string[]; // Añadir esta propiedad para recibir los IDs seleccionados
}

export function MyMultiSelect({ options, setSelectedData, selectedIds }: MultiSelectProps) {

  const optionsAsOptionType: Option[] = options.map(option => ({ label: option, value: option }));

  // Función para calcular el estado inicial de selectedOptions basado en selectedIds
  const getInitialSelectedOptions = (): Option[] => {
    if (selectedIds) {
      return selectedIds.map(option => ({ label: option, value: option }));
    }
    return [];
  };

  // Estado para manejar las opciones seleccionadas
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(getInitialSelectedOptions);

  return (
    <MultiSelect
      className='w-100 mb-3'
      options={optionsAsOptionType}
      value={selectedOptions}
      onChange={(e) => {
        if (e) {
          const selectedValues: string[] = e.map(option => option.value);
          setSelectedOptions(e);
          setSelectedData(selectedValues);
        }
      }}
      labelledBy="Select"
    />
  );
}

// Asegúrate de que tu componente acepte una prop `defaultValue`
export const MySelect = ({ options, setSelectedItem, defaultValue }: SelectProps) => {
  // Transforma las opciones a la estructura requerida por react-select
  const optionsAsOptionType = options.map(option => ({ label: option, value: option }));
 
  // Función para manejar el cambio de selección
  const handleChange = (selectedOption: Option | null) => {
     if (selectedOption) {
       setSelectedItem(selectedOption.value);
     } else {
       // Maneja el caso cuando no hay selección
       // Puedes establecer un valor predeterminado o simplemente no hacer nada
       setSelectedItem(''); // O cualquier valor predeterminado que desees
     }
  };
 
  // Asegúrate de que defaultValue siempre sea un objeto que coincida con la estructura de las opciones
  const defaultValueAsOptionType = defaultValue ? { label: defaultValue, value: defaultValue } : null;
 
  console.log(defaultValueAsOptionType);
  
  return (
     <Select
       className='w-100 mb-3'
       options={optionsAsOptionType}
       value={defaultValueAsOptionType}
       onChange={handleChange}
     />
  );
 };
