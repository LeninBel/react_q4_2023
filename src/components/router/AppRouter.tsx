import { createBrowserRouter, defer } from 'react-router-dom';
import { Home } from '../../pages/home/Home';
import { getBook } from '../../services/book';
import { ResultDetails } from '../resultDetails/ResultDetails';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { NotFound } from '../../pages/notFound/NotFound';
import { ResultsListContainer } from '../resultsList/ResultsListConteiner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '/search/:pageId',
        id: 'searchResults',
        element: <ResultsListContainer />,

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
  {
    path: '/notFound',
    element: <NotFound />,
  },
]);
