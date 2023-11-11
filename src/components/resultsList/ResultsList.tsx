import { NavLink, Outlet } from 'react-router-dom';
import { Book } from '../../services/book';
import './ResultsList.css';
import { useContext } from 'react';
import { AppContext } from '../../context/SearchContext';

export const ResultsList = () => {
  const { results } = useContext(AppContext);

  return (
    <>
      <div className="Results">
        {results && results.books && results.books.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {results.books.map((book: Book) => (
                <tr key={book.uid}>
                  <td scope="row">
                    <NavLink className="bookLink" to={`details/${book.uid}`}>
                      {book.title}
                    </NavLink>
                  </td>
                  <td>Published in {book.publishedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Outlet></Outlet>
      </div>
    </>
  );
};
