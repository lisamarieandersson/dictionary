import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { expect, test } from 'vitest';
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

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'coffee');

  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(screen.getByText('coffee')).toBeInTheDocument();

  expect(
    screen.getByText(
      /A beverage made by infusing the beans of the coffee plant in hot water./i
    )
  ).toBeInTheDocument();
});

test('should display new word after submission via enter', async () => {
  render(<App />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'coffee');

  await user.type(searchInput, 'coffee{Enter}');

  expect(screen.getByText('coffee')).toBeInTheDocument();

  expect(
    screen.getByText(
      /A beverage made by infusing the beans of the coffee plant in hot water./i
    )
  ).toBeInTheDocument();
});

test('should display error message after empty submission via click', async () => {
  render(<App />);
  const user = userEvent.setup();

  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(
    screen.getByText(/Please enter a word to search\./i)
  ).toBeInTheDocument();
});

test('should display error message after empty submission via enter', async () => {
  render(<App />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, '{Enter}');

  expect(
    screen.getByText(/Please enter a word to search\./i)
  ).toBeInTheDocument();
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
  // Check if the text "Dark Mode" is present in the document
  expect(screen.getByText('Dark Mode')).toBeInTheDocument();
});
