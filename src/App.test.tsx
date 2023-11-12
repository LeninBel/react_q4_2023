import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './components/router/AppRouter';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const lsSetItem = vi.spyOn(Storage.prototype, 'setItem');
const lsGetItem = vi.spyOn(Storage.prototype, 'getItem');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('App', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  it('should render when route is not match to any ', () => {
    const badRoute = '/search/1';
    lsGetItem.mockImplementation(() => 'LocalStorage value');

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            books: [],
          }),
      })
    ) as Mock;

    const router = createMemoryRouter(routes, {
      initialEntries: [badRoute],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('search_input')).toHaveValue(
      'LocalStorage value'
    );
  });

  it('should render when route is not match to anyd ', async () => {
    const badRoute = '/search/1';
    lsGetItem.mockImplementation(() => 'LocalStorage value');

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            books: [],
          }),
      })
    ) as Mock;

    const router = createMemoryRouter(routes, {
      initialEntries: [badRoute],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId('search_input'), '123');
    await user.click(screen.getByTestId('search_button'));
    expect(lsSetItem).toHaveBeenCalledTimes(1);
    expect(lsSetItem).toHaveBeenCalledWith(
      'searchTerm',
      'LocalStorage value123'
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('search/1', {
      replace: true,
    });
  });
});
