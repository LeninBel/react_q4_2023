import { useEffect, useState } from 'react';
import { Search } from '../../components/search/Search';
import './Home.css';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { getLsSearchTerm } from '../../services/localStorage';
import { BooksResponse } from '../../services/book';
import { AppContext } from '../../context/SearchContext';

export const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const isHomePage = useMatch('/');

  const [search, setSearch] = useState(() => getLsSearchTerm());
  const [results, setResults] = useState<BooksResponse | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);

  useEffect(() => {
    if (isHomePage) {
      navigate(`search/1`);
    }
  }, [navigate, isHomePage]);

  if (error) {
    throw new Error('Error!');
  }

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        results,
        setResults,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      <div className="homeContainer">
        <button
          onClick={() => {
            setError(true);
          }}
        >
          Throw an Error
        </button>
        <Search />
        <Outlet></Outlet>
      </div>
    </AppContext.Provider>
  );
};
