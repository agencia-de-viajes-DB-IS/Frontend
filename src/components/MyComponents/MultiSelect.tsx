import React, { useState } from 'react';
import { MultiSelect, Option } from "react-multi-select-component";
import Select from 'react-select';

interface SelectProps {
    options: string[];
    setSelectedItem: (arg:string) => void;
}

interface MultiSelectProps {
  options: string[];
  setSelectedData: (arg:string[]) => void;
}

export function MyMultiSelect({ options , setSelectedData}: MultiSelectProps) {
 
    const optionsAsOptionType: Option[] = options.map(option => ({ label: option, value: option }));

 // Estado para manejar las opciones seleccionadas
 const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

 return (
    <MultiSelect
      className='w-100 mb-3'
      options={optionsAsOptionType}
      value={selectedOptions}
      onChange={(e) => {
        if(e) {
          const selectedValues:string[] = e.map(option => option.value);
          setSelectedOptions(e);
          setSelectedData(selectedValues);
      }
        
      }}
      labelledBy="Select"
    />
 );
}

export function MySelect({ options , setSelectedItem}: SelectProps) {

    // Transform the array of strings into an array of objects with label and value properties
    const data = options.map(option => ({ label: option, value: option }));
    
    const [selected,setSelected] = useState<string>("");
    
    return (
        <Select
          className='w-100 mb-3 border border-secondary'
          defaultValue={selected}
          onChange={(e) => {
            if(e) {
              setSelectedItem(e.value); 
              setSelected(e.value);
            }
          }}
          options={data}
        />
    );
}
