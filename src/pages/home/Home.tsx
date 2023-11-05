import { useEffect, useState } from 'react';
import { Search } from '../../components/search/Search';
import './Home.css';
import { LOCALSTORAGE_KEY } from '../../services/localStorage';
import { Outlet, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    navigate(`search/1`);
  }, [navigate]);

  const handleSearchClick = async (searchTerm: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY, searchTerm);
    navigate(`search/1`, { replace: true });
  };

  if (error) {
    throw new Error('Error!');
  }

  return (
    <div className="homeContainer">
      <button
        onClick={() => {
          setError(true);
        }}
      >
        Throw an Error
      </button>
      <Search onClick={handleSearchClick} />
      <Outlet></Outlet>
    </div>
  );
};
