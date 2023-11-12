import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as BookService from '../../services/book';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router/AppRouter';
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

describe('ResultDetails', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should call new request to get data and loaders', async () => {
    vi.spyOn(BookService, 'findBook');
    const getBook = vi.spyOn(BookService, 'getBook').mockImplementation(() =>
      Promise.resolve({
        uid: '1',
        title: 'First',
        numberOfPages: 1,
      } as BookService.Book)
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ['/search/1/details/1'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.queryByText('Loading card...')).not.toBeInTheDocument()
    );

    expect(getBook).toHaveBeenCalledWith('1');
  });

  it('should render card data', async () => {
    vi.spyOn(BookService, 'findBook');
    vi.spyOn(BookService, 'getBook').mockImplementation(() =>
      Promise.resolve({
        uid: '1',
        title: 'First',
        numberOfPages: 1,
      } as BookService.Book)
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ['/search/1/details/1'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.queryByText('Loading card...')).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByText('numberOfPages 1')).toBeInTheDocument()
    );
  });

  it('should be closed clicking on Close button', async () => {
    vi.spyOn(BookService, 'findBook');
    vi.spyOn(BookService, 'getBook').mockImplementation(() =>
      Promise.resolve({
        uid: '1',
        title: 'First',
        numberOfPages: 1,
      } as BookService.Book)
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ['/search/1/details/1'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.queryByText('Loading card...')).not.toBeInTheDocument()
    );

    await waitFor(
      () =>
        expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument(),
      { timeout: 5000 }
    );

    const cardCloseButton = await screen.findByRole('button', { name: 'X' });

    const user = userEvent.setup();
    await user.click(cardCloseButton);

    await new Promise((_) => setTimeout(_, 1000));

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/search/1', {
        replace: true,
      })
    );
  });
});
