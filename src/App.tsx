import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './components/router/AppRouter';
import { AppContext } from './context/SearchContext';
import { useState } from 'react';
import { getLsSearchTerm } from './services/localStorage';
import { BooksResponse } from './services/book';

function App() {
  const [search, setSearch] = useState(() => getLsSearchTerm());
  const [results, setResults] = useState<BooksResponse | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
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
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
