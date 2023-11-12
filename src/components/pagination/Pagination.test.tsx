import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

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
      results: {
        page: {
          totalPages: 10,
        },
      },
    }),
  };
});

describe('Pagination', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should change URL after clicking on page button', async () => {
    render(<Pagination />);

    const user = userEvent.setup();

    await user.click(screen.getByText('5'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/search/5', {
      replace: true,
    });
  });
});
