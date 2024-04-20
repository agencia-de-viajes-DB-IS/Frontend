import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import './styles.css';

interface SelectProps {
  options: string[];
  setSelectedItem: (arg: string) => void;
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

export function MySelect({ options, setSelectedItem }: SelectProps) {

  // Transform the array of strings into an array of objects with label and value properties
  const data = options.map(option => ({ label: option, value: option }));

  const [selected, setSelected] = useState<string>("");

  return (
    <Select
      className='w-100 mb-3'
      defaultValue={selected}
      onChange={(e) => {
        if (e) {
          setSelectedItem(e.value);
          setSelected(e.value);
        }
      }}
      options={data}
    />
  );
}
