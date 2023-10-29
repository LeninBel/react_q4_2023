import { Component } from 'react';
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
export class Home extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearch = localStorage.getItem(LOCALSTORAGE_KEY) ?? '';
    this.state = {
      books: [],
      inputValue: savedSearch,
      isFetched: false,
      error: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  async componentDidMount() {
    const result = await findBook(this.state.inputValue);
    this.setState(() => ({
      books: result,
      isFetched: true,
    }));
  }

  handleInput(searchTerm: string) {
    this.setState(() => ({
      inputValue: searchTerm,
    }));
  }

  handleSearchClick = async () => {
    localStorage.setItem(LOCALSTORAGE_KEY, this.state.inputValue);
    this.setState(() => ({
      isFetched: false,
    }));
    const result = await findBook(this.state.inputValue);
    this.setState(() => ({
      books: result,
      isFetched: true,
    }));
  };

  render() {
    const { inputValue, isFetched, books, error } = this.state;

    if (error) {
      throw new Error('Error!');
    }

    return (
      <div className="homeContainer">
        <button
          onClick={() => {
            this.setState(() => ({
              error: true,
            }));
          }}
        >
          Throw an Error
        </button>
        <Search
          onChange={this.handleInput}
          onClick={this.handleSearchClick}
          inputValue={inputValue}
        />
        {!isFetched ? <Loader /> : <ResultsList books={books} />}
      </div>
    );
  }
}
