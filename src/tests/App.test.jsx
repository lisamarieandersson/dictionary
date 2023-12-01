// Integration tests / User flow tests for App
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import App from '../App';
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  // Clear session storage or reset global state
  sessionStorage.clear();
});

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

  // Check if the word 'coffee' is in the document
  expect(screen.getByText('coffee')).toBeInTheDocument();

  // Check for phonetics
  expect(screen.getByText(/ˈkɑ.fi/i)).toBeInTheDocument();

  // Check for the example in the definitions
  expect(
    screen.getByText('Example: He did not stay for coffee.')
  ).toBeInTheDocument();

  // Check for noun definitions
  expect(screen.getByText('noun')).toBeInTheDocument();
  expect(
    screen.getByText(
      'A beverage made by infusing the beans of the coffee plant in hot water.'
    )
  ).toBeInTheDocument();

  // Check for verb definitions (if applicable)
  expect(screen.getByText('verb')).toBeInTheDocument();
  expect(screen.getByText('To drink coffee.')).toBeInTheDocument();

  // Check for adjective definitions (if applicable)
  expect(screen.getByText('adjective')).toBeInTheDocument();
  expect(
    screen.getByText('Of a pale brown colour, like that of milk coffee.')
  ).toBeInTheDocument();
});

test('should display new word after submission via enter', async () => {
  render(<App />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'coffee{Enter}');

  // Check if the word 'coffee' is in the document
  expect(screen.getByText('coffee')).toBeInTheDocument();

  // Check for phonetics
  expect(screen.getByText(/ˈkɑ.fi/i)).toBeInTheDocument();

  // Check for the example in the definitions
  expect(
    screen.getByText('Example: He did not stay for coffee.')
  ).toBeInTheDocument();

  // Check for noun definitions
  expect(screen.getByText('noun')).toBeInTheDocument();
  expect(
    screen.getByText(
      'A beverage made by infusing the beans of the coffee plant in hot water.'
    )
  ).toBeInTheDocument();

  // Check for verb definitions (if applicable)
  expect(screen.getByText('verb')).toBeInTheDocument();
  expect(screen.getByText('To drink coffee.')).toBeInTheDocument();

  // Similarly, check for adjective definitions (if applicable)
  expect(screen.getByText('adjective')).toBeInTheDocument();
  expect(
    screen.getByText('Of a pale brown colour, like that of milk coffee.')
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

test('should display error message when a non-existent word in the API is searched', async () => {
  render(<App />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'kaffe{Enter}');

  // Wait for the error message to appear
  const errorMessage = await screen.findByText('Word not found');
  expect(errorMessage).toBeInTheDocument();
});

test('should display synonyms and antonyms for a word', async () => {
  render(<App />);
  const user = userEvent.setup();

  // Search for 'ephemeral'
  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'ephemeral');
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  // Wait for the synonyms section to be displayed
  const synonymsSection = await screen.findByText(/Synonyms: ephemeron/i);
  expect(synonymsSection).toBeInTheDocument();

  // Wait for the antonyms section to be displayed
  const antonymsSection = await screen.findByText(
    /Antonyms: eternal, everlasting, permanent/i
  );
  expect(antonymsSection).toBeInTheDocument();
});

test('should render audio elements when available and verify that their source is correct', async () => {
  render(<App />);
  const user = userEvent.setup();

  // Trigger the search
  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'coffee{Enter}');

  // Wait for the audio elements to appear in the DOM
  await waitFor(() => {
    const audioElements = screen.getAllByLabelText('word pronunciation');
    expect(audioElements.length).toBeGreaterThan(0);

    // Verify the source of the first audio element
    const firstAudioElement = audioElements[0];
    expect(firstAudioElement).toHaveAttribute('src');
    expect(firstAudioElement.src).toContain(
      'https://api.dictionaryapi.dev/media/pronunciations/en/coffee-uk.mp3'
    );
  });
});

test('should be able to add a word as a favorite and see it in the favorites list', async () => {
  render(<App />);
  const user = userEvent.setup();

  // Search for a word first
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await user.type(searchInput, 'ephemeral');
  await user.click(searchButton);

  // Wait for 'ephemeral' to be displayed after search
  await waitFor(() => {
    expect(screen.getByText('ephemeral')).toBeInTheDocument();
  });

  // Click on the "Add To Favorites" button
  const addToFavoritesButton = screen.getByRole('button', {
    name: /add to favorites/i,
  });
  await user.click(addToFavoritesButton);

  // Click on the "Favorites" button to view the favorites list
  const viewFavoritesButton = screen.getByRole('button', {
    name: /favorites/i,
  });
  await user.click(viewFavoritesButton);

  // Check if the favorited word 'ephemeral' is in the favorites list
  expect(screen.getByText('ephemeral')).toBeInTheDocument();
});

test('should be able to remove a word from the favorites list', async () => {
  render(<App />);
  const user = userEvent.setup();

  // Search for the word and wait for it to appear
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.type(searchInput, 'ephemeral');
  await user.click(searchButton);

  await waitFor(() =>
    expect(screen.getByText('ephemeral')).toBeInTheDocument()
  );

  // Click the "Add To Favorites" button
  const addToFavoritesButton = screen.getByRole('button', {
    name: /add to favorites/i,
  });
  await user.click(addToFavoritesButton);

  // Navigate to the favorites list
  const viewFavoritesButton = screen.getByRole('button', {
    name: /favorites/i,
  });
  await user.click(viewFavoritesButton);

  // Ensure 'ephemeral' is in the favorites list
  expect(screen.getByText('ephemeral')).toBeInTheDocument();

  // Find and click the remove button for 'ephemeral'
  const removeButton = within(
    screen.getByText('ephemeral').closest('li')
  ).getByRole('button', { name: /remove/i });
  await user.click(removeButton);

  // Verify 'ephemeral' is no longer in the favorites list
  expect(screen.queryByText('ephemeral')).not.toBeInTheDocument();
});

test('should be able to switch from light to dark mode', async () => {
  render(<App />);
  const user = userEvent.setup();

  const appRoot = screen.getByTestId('app-root');
  expect(appRoot).toHaveAttribute('data-theme', 'light');
  expect(screen.getByText('Light Mode')).toBeInTheDocument();

  const toggle = screen.getByRole('checkbox', { name: /Dark Mode/i });
  await user.click(toggle);

  // Check if the theme has changed to dark
  await waitFor(() => {
    expect(appRoot).toHaveAttribute('data-theme', 'dark');
  });
  // Check if the text "Dark Mode" is present in the document
  expect(screen.getByText('Dark Mode')).toBeInTheDocument();
});
