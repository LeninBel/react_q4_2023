import { createContext } from 'react';
import { BooksResponse } from '../services/book';

export const SearchContext = createContext({
  search: '',
  setSearch: () => {},
});

type AppContextType = {
  search: string;
  setSearch: (str: string) => void;
  results: undefined | BooksResponse;
  setResults: (books: BooksResponse | undefined) => void;
  itemsPerPage: number;
  setItemsPerPage: (perPage: number) => void;
};

export const AppContext = createContext<AppContextType>({
  search: '',
  setSearch: () => {},
  results: undefined,
  setResults: () => {},
  itemsPerPage: 50,
  setItemsPerPage: () => {},
});
