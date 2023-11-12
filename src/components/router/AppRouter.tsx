import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/home/Home';
import { ResultDetails } from '../resultDetails/ResultDetails';
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { NotFound } from '../../pages/notFound/NotFound';
import { ResultsListContainer } from '../resultsList/ResultsListConteiner';

export const resultsRoute = {
  path: '/search/:pageId',
  id: 'searchResults',
  element: <ResultsListContainer />,

  children: [
    {
      path: '/search/:pageId/details/:detailsId',
      element: <ResultDetails />,
    },
  ],
};

export const routes = [
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
];

export const router = createBrowserRouter(routes);
