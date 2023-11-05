import { useEffect } from 'react';
import { Search } from '../../components/search/Search';
import './Home.css';
import { LOCALSTORAGE_KEY } from '../../services/localStorage';
import { Outlet, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`search/1`);
  }, [navigate]);

  const handleSearchClick = async (searchTerm: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY, searchTerm);
    navigate(`search/1`);
  };

  return (
    <div className="homeContainer">
      <Search onClick={handleSearchClick} />
      <Outlet></Outlet>

      {/* {navigation.state === 'loading' ? (
        <Loader />
      ) : (
        <ResultsList books={books} />
      )} */}
    </div>
  );
};
