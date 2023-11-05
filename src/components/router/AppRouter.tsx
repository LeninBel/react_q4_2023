import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/home/Home';
import { getLsSearchTerm } from '../../services/localStorage';
import { findBook, getBook } from '../../services/book';
import { ResultsList } from '../resultsList/ResultsList';
import { ResultDetails } from '../resultDetails/ResultDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/search/:pageId',
        id: 'searchResults',
        loader: async ({ params, request }) => {
          console.log(request);
          const pageId = Number.parseInt(params.pageId ?? '1');
          const term = getLsSearchTerm();
          const perPage = localStorage.getItem('PerPage') ?? 50;
          const res = await findBook(term, pageId, +perPage);
          return res;
        },
        element: <ResultsList />,

        children: [
          {
            path: '/search/:pageId/details/:detailsId',
            loader: async ({ params }) => {
              const res = await getBook(params.detailsId ?? '');
              console.log(res);
              return res;
            },
            element: <ResultDetails />,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/search/:page',
  //   loader: async () => {
  //     const term = getLsSearchTerm();
  //     const res = await findBook(term);
  //     return res?.books;
  //   },
  //   element: <ResultsList />,
  // },
]);
