import { ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/SearchContext';

const options = [50, 20, 5];
export const PerPage = () => {
  const { itemsPerPage, setItemsPerPage } = useContext(AppContext);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    navigate(`/search/1`, { replace: true });
  };
  return (
    <select onChange={onChange} value={itemsPerPage}>
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
