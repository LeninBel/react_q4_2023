import { Component } from 'react';
import './Search.css';

type Props = {
  onChange: (term: string) => void;
  onClick: () => void;
  inputValue: string;
};

export class Search extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    this.props.onChange(searchTerm);
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.props.inputValue}
          onChange={this.handleInput}
          className="searchBar"
        />
        <button type="button" onClick={this.props.onClick}>
          Search
        </button>
      </div>
    );
  }
}
