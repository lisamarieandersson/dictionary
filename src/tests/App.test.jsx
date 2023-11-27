import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';
import mockWords from './mockWords.json';

const server = setupServer(
  rest.get(
    'https://api.dictionaryapi.dev/api/v2/entries/en/:word',
    (req, res, ctx) => {
      return res(ctx.json(mockWords)); // Return mock data
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render the correct header', () => {
  render(<App />);
  expect(screen.getByText('Dictionary')).toBeInTheDocument();
});

test('should display new word after submission via click', async () => {
  render(<App />);
  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  await user.type(input, 'coffee');

  const button = screen.getByRole('button', { name: /search/i });
  await user.click(button);

  await waitFor(() => {
    expect(screen.getByText('coffee')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('coffee')).toBeInTheDocument();
  });
});

test('should display new word after submission via enter', async () => {
  render(<App />);
  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  await user.type(input, 'coffee');

  await user.type(input, 'coffee{Enter}');

  await waitFor(() => {
    expect(screen.getByText('coffee')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('coffee')).toBeInTheDocument();
  });
});

test('should be able to switch from light to dark mode', async () => {
  render(<App />);
  const user = userEvent.setup();

  const appRoot = screen.getByTestId('app-root');
  expect(appRoot).toHaveAttribute('data-theme', 'light');

  const toggle = screen.getByRole('checkbox', { name: /Dark Mode/i });
  await user.click(toggle);

  // Check if the theme has changed to dark
  await waitFor(() => {
    expect(appRoot).toHaveAttribute('data-theme', 'dark');
  });

  // Kolla så att texten dark syns med!! sista grejen på detta test
});
