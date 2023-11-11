import { useEffect, useState } from 'react';
import { Search } from '../../components/search/Search';
import './Home.css';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const isHomePage = useMatch('/');

  useEffect(() => {
    if (isHomePage) {
      navigate(`search/1`);
    }
  }, [navigate, isHomePage]);

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
      <Search />
      <Outlet></Outlet>
    </div>
  );
};
