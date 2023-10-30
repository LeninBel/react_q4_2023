import './Search.css';

type Props = {
  onChange: (term: string) => void;
  onClick: () => void;
  inputValue: string;
};

export const Search = ({ inputValue, onClick, onChange }: Props) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    onChange(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        className="searchBar"
      />
      <button type="button" onClick={onClick}>
        Search
      </button>
    </div>
  );
};
