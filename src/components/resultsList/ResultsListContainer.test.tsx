import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ResultsListContainer } from './ResultsListConteiner';
import * as BookService from '../../services/book';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useContext: () => ({
      setResults: () => {},
      results: {
        books: [],
        page: {
          totalPages: 10,
        },
      },
    }),
  };
});

describe('ResultsListContainer', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should render "Not Found any results" if results not found', async () => {
    vi.spyOn(BookService, 'findBook');
    render(<ResultsListContainer />);

    await waitFor(() =>
      expect(screen.getByText('Not Found any results')).toBeInTheDocument()
    );
  });
});
