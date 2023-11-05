import {
  NavLink,
  Outlet,
  useLoaderData,
  useMatch,
  useNavigation,
} from 'react-router-dom';
import { BooksResponse } from '../../services/book';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { PerPage } from '../perPage/PerPage';
import './ResultsList.css';

export const ResultsList = () => {
  const res = useLoaderData() as BooksResponse;
  const navigation = useNavigation();
  const match = useMatch('/search/:pageId');
  const isLoading = navigation.state === 'loading';

  if (match && navigation.location?.pathname === match.pathname && isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="Results">
        {res.books && res.books.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {res.books.map((book) => (
                <tr key={book.uid}>
                  <td scope="row">
                    <NavLink to={`details/${book.uid}`}>{book.title}</NavLink>
                  </td>
                  <td>Published in {book.publishedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Outlet></Outlet>
      </div>
      <div className="PaginationFooter">
        <PerPage></PerPage>
        <Pagination totalPages={res.page.totalPages}></Pagination>
      </div>
    </>
  );
};
