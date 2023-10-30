import { Component, useEffect, useState } from 'react';
import { Search } from '../../components/search/Search';
import { ResultsList } from '../../components/resultsList/ResultsList';
import { Book, findBook } from '../../services/book';
import { Loader } from '../../components/loader/Loader';
import './Home.css';

interface IState {
  books: Array<Book>;
  inputValue: string;
  isFetched: boolean;
  error: boolean;
}
const LOCALSTORAGE_KEY = 'searchTerm';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem(LOCALSTORAGE_KEY) ?? ''
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await findBook(
        localStorage.getItem(LOCALSTORAGE_KEY) ?? ''
      );
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
