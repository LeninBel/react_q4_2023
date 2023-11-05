import { createBrowserRouter, defer } from 'react-router-dom';
import { Home } from '../../pages/home/Home';
import { getLsSearchTerm } from '../../services/localStorage';
import { findBook, getBook } from '../../services/book';
import { ResultsList } from '../resultsList/ResultsList';
import { ResultDetails } from '../resultDetails/ResultDetails';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/search/:pageId',
        id: 'searchResults',
        loader: ({ params }) => {
          const pageId = Number.parseInt(params.pageId ?? '1');
          const term = getLsSearchTerm();
          const perPage = localStorage.getItem('PerPage') ?? 50;
          const res = findBook(term, pageId, +perPage);
          return defer({ result: res });
        },
        element: <ResultsList />,

        children: [
          {
            path: '/search/:pageId/details/:detailsId',
            loader: async ({ params }) => {
              const res = getBook(params.detailsId ?? '');
              return defer({ result: res });
            },
            element: <ResultDetails />,
          },
        ],
      },
    ],
  },
]);
