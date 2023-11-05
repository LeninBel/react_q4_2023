import { useState } from 'react';
import './Search.css';
import { getLsSearchTerm } from '../../services/localStorage';

type Props = {
  onClick: (searchTerm: string) => void;
};

export const Search = ({ onClick }: Props) => {
  const [searchTerm, setSearchTerm] = useState(() => getLsSearchTerm());
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInput}
        className="searchBar"
      />
      <button type="button" onClick={() => onClick(searchTerm)}>
        Search
      </button>
    </div>
  );
};
