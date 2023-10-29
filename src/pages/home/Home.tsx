import { Component } from 'react';
import { Search } from '../../components/search/Search';
import { ResultsList } from '../../components/resultsList/ResultsList';
import { Book, findBook } from '../../services/book';

interface IState {
  books: Array<Book> | undefined;
  inputValue: string;
}
const LOCALSTORAGE_KEY = 'searchTerm';
export class Home extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearch = localStorage.getItem(LOCALSTORAGE_KEY) ?? '';
    this.state = { books: [], inputValue: savedSearch };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInput(searchTerm: string) {
    this.setState(() => ({
      inputValue: searchTerm,
    }));
  }

  handleSearchClick = async () => {
    localStorage.setItem(LOCALSTORAGE_KEY, this.state.inputValue);
    const result = await findBook(this.state.inputValue);
    this.setState(() => ({
      books: result,
    }));
  };

  render() {
    return (
      <div>
        <Search
          onChange={this.handleInput}
          onClick={this.handleSearchClick}
          inputValue={this.state.inputValue}
        />
        <ResultsList books={this.state.books} />
      </div>
    );
  }
}
