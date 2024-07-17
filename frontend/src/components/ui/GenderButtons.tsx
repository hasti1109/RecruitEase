import React, { useState } from 'react';

type RadioButtonGroupProps = {
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
}

const GenderButtons = ({ 
  options, 
  onChange 
} : RadioButtonGroupProps) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div className='mt-1'>
          {options.map((option) => (
            <label key={option.value} className="mr-3">
              <input
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleChange}
                className="mr-1"
              />
                {option.label}
            </label>
          ))}
        </div>
    );
};

export default GenderButtons;
