import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as BookService from '../../services/book';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { resultsRoute, routes } from '../router/AppRouter';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => ({
      setResults: () => {},
      results: {
        books: [
          { uid: '1', title: 'First', publishedYear: 1 },
          { uid: '2', title: 'Second', publishedYear: 2 },
        ],
        page: {
          totalPages: 1,
        },
      },
    }),
  };
});

describe('ResultsList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render specific number of cards', async () => {
    vi.spyOn(BookService, 'findBook');
    const router = createMemoryRouter([resultsRoute], {
      initialEntries: ['/search/1'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.queryAllByRole('row').length).toBe(3));
  });

  it('should render the relevant card data', async () => {
    vi.spyOn(BookService, 'findBook');
    const router = createMemoryRouter([resultsRoute], {
      initialEntries: ['/search/1'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.getByText('First')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText('Published in 1')).toBeInTheDocument()
    );
  });

  it('should render link to card details', async () => {
    vi.spyOn(BookService, 'findBook');
    const router = createMemoryRouter(routes, {
      initialEntries: ['/search/1'],
    });

    render(<RouterProvider router={router} />);
    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );
    await new Promise((_) => setTimeout(_, 1000));

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
    );

    const bookLink = await screen.findByRole('button', { name: 'First' });

    const user = userEvent.setup();
    await user.click(bookLink);

    await new Promise((_) => setTimeout(_, 1000));

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('./details/1', {
        relative: 'route',
      })
    );
  });
});
