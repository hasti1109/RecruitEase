import React, { useState } from 'react';
import CheckBox from './CheckBox';

type TitleFilterProps = {
  onFilterChange: (selectedTitles: String[]) => void;
};

const TitleFilter: React.FC<TitleFilterProps> = ({ onFilterChange }) => {
  const [selectedTitles, setSelectedTitles] = useState<String[]>([]);
const titleOptions = ['Software Engineer', 'Fullstack Developer', 'Product Manager', 'Data Scientist', 'UI/UX Designer', 'Marketing Specialist', 'Graphic Designer'];


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, title: String) => {
    const updatedTitles = event.target.checked 
      ? [...selectedTitles, title]
      : selectedTitles.filter(t => t !== title);

    setSelectedTitles(updatedTitles);
    onFilterChange(updatedTitles); 
   };

  return (
    <div className="relative">
      <div className="flex justify-between items-center font-semibold">Title</div>
      <div className="flex-col mt-1 text-xs bg-transparent">
        {titleOptions.map(title => (
          <CheckBox
            key={title}
            id={`title-${title}`}
            checked={selectedTitles.includes(title)}
            onChange={(e) => handleCheckboxChange(e, title)}
            label={title}
          />
        ))}
      </div>
    </div>
  );
};

export default TitleFilter;
