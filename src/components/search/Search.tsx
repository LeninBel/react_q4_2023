import { useContext, useRef } from 'react';
import './Search.css';
import { LOCALSTORAGE_KEY } from '../../services/localStorage';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/SearchContext';

export const Search = () => {
  const navigate = useNavigate();
  const { search, setSearch } = useContext(AppContext);

  const seachRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = async () => {
    const searchTerm = seachRef.current?.value ?? '';
    setSearch(searchTerm);
    console.log(searchTerm);
    localStorage.setItem(LOCALSTORAGE_KEY, searchTerm);
    navigate(`search/1`, { replace: true });
  };

  return (
    <div className="search">
      <input
        type="text"
        defaultValue={search}
        ref={seachRef}
        className="searchBar"
      />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};
