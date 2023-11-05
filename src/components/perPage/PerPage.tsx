import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [50, 20, 5];
export const PerPage = () => {
  const navigate = useNavigate();
  const [currentOption, setCurrentOption] = useState(
    () => localStorage.getItem('PerPage') ?? 50
  );

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentOption(e.target.value);
    localStorage.setItem('PerPage', e.target.value);
    navigate(`/search/1`, { replace: true });
  };
  return (
    <select onChange={onChange} value={currentOption}>
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
