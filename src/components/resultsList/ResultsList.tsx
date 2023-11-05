import {
  Await,
  NavLink,
  Outlet,
  useLoaderData,
  useMatch,
  useNavigation,
} from 'react-router-dom';
import { Book, BooksResponse } from '../../services/book';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { PerPage } from '../perPage/PerPage';
import './ResultsList.css';
import React from 'react';

type Data = {
  result: Promise<BooksResponse>;
};
export const ResultsList = () => {
  const res = useLoaderData() as Data;
  const match = useMatch('search/:pageId');

  const navigation = useNavigation();
  if (match && navigation.state === 'loading') {
    return <Loader />;
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <Await
        resolve={res.result}
        errorElement={<p>Opps something went wrong!</p>}
      >
        {(result) => {
          return (
            <>
              <div className="Results">
                {result.books && result.books.length !== 0 && (
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.books.map((book: Book) => (
                        <tr key={book.uid}>
                          <td scope="row">
                            <NavLink
                              className="bookLink"
                              to={`details/${book.uid}`}
                            >
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
              <div className="PaginationFooter">
                <PerPage></PerPage>
                {result.page && (
                  <Pagination totalPages={result.page.totalPages}></Pagination>
                )}
              </div>
            </>
          );
        }}
      </Await>
    </React.Suspense>
  );
};
