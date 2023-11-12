import { useNavigate, useParams } from 'react-router-dom';
import { findBook } from '../../services/book';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { PerPage } from '../perPage/PerPage';
import './ResultsList.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/SearchContext';
import { ResultsList } from './ResultsList';
import { NotFoundResults } from './NotFoundResults';

export const ResultsListContainer = () => {
  const { search, setResults, itemsPerPage, results } = useContext(AppContext);
  const [isLoading, seIsLoading] = useState(false);
  const { pageId = '1' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    seIsLoading(true);
    const fecthData = async () => {
      const res = await findBook(search, +pageId, itemsPerPage);
      setResults(res);
      seIsLoading(false);
      if (res === undefined) {
        // navigate('/notFound');
      }
    };

    fecthData();
  }, [pageId, search, setResults, itemsPerPage, navigate]);

  if (isLoading) {
    return <Loader id="" />;
  }

  if (results && results.books.length === 0) {
    return <NotFoundResults />;
  }

  return (
    <>
      <ResultsList />
      <div className="PaginationFooter">
        <PerPage />
        <Pagination />
      </div>
    </>
  );
};
