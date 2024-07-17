import React from 'react';

type InputFieldProps = {
    label: string;
    value: string;
    placeholder:string;
    onChange: (value: string) => void;
    required: boolean;
}

const InputField = ({ 
    label, 
    value, 
    onChange, 
    required,
    placeholder 
}: InputFieldProps) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className='flex flex-col justify-start items-start p-3 pl-10 w-2/4'>
            <label htmlFor="inputField">{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                type="text"
                id="inputField"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
                className='py-2 border-[1px] border-gray-400 rounded-md placeholder:text-sm text-sm px-2 focus:border-black focus:outline-none mt-1 w-56'
            />
        </div>
    );
};

export default InputField;
