import React from 'react';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CheckBox: React.FC<CheckboxProps> = ({ id, checked, onChange, label }) => {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-4 p-2 transition hover:bg-white"
    >
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="size-4 rounded border-gray-300"
        />
      </div>
      <div>
        <p className="text-gray-900">{label}</p>
      </div>
    </label>
  );
};

export default CheckBox;
