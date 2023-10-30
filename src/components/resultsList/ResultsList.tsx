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

    return (
      <>
        {books && books.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.uid}>
                  <td scope="row">{book.title}</td>
                  <td>Published in {book.publishedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
}
