import { Component } from 'react';
import { Book } from '../../services/book';

type Props = {
  books: Book[] | undefined;
};

export class ResultsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { books } = this.props;
    console.log(books);
    return <div>test</div>;
  }
}
