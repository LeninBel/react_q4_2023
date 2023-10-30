import { Book } from '../../services/book';

type Props = {
  books: Book[] | undefined;
};

export const ResultsList = ({ books }: Props) => {
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
};
