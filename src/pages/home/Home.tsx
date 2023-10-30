import { useEffect, useState } from 'react';
import { Search } from '../../components/search/Search';
import { ResultsList } from '../../components/resultsList/ResultsList';
import { Book, findBook } from '../../services/book';
import { Loader } from '../../components/loader/Loader';
import './Home.css';

const LOCALSTORAGE_KEY = 'searchTerm';

const getLsSearchTerm = () => localStorage.getItem(LOCALSTORAGE_KEY) ?? '';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState(getLsSearchTerm);
  const [books, setBooks] = useState<Book[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const term = getLsSearchTerm();
      const result = await findBook(term);
      setBooks(result);
      setIsFetched(true);
    }
    fetchData();
  }, []);

  const handleInput = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSearchClick = async () => {
    localStorage.setItem(LOCALSTORAGE_KEY, searchTerm);
    setIsFetched(false);
    const result = await findBook(searchTerm);
    setIsFetched(true);
    setBooks(result);
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
      <Search
        onChange={handleInput}
        onClick={handleSearchClick}
        inputValue={searchTerm}
      />
      {!isFetched ? <Loader /> : <ResultsList books={books} />}
    </div>
  );
};
