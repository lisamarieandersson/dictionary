// Integration tests / User flow tests for App
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from '../App';
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  // Clear session storage or reset global state
  sessionStorage.clear();
});

describe('Header', () => {
  test('should render the correct headline in header', () => {
    render(<App />);
    expect(screen.getByText('Dictionary')).toBeInTheDocument();
  });
});

describe('Search form', () => {
  test('should allow user to type in the search input', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'asd');

    expect(searchInput).toHaveValue('asd');
  });

  test('should clear the search input after search with click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Simulate typing and then searching
    await user.type(searchInput, 'coffee');
    await user.click(searchButton);

    expect(searchInput).toHaveValue('');
  });

  test('should clear the search input after search with enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    expect(searchInput).toHaveValue('');
  });
});

describe('Search for a word', () => {
  test('should display the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const displayedWord = await screen.findByText('coffee');
    expect(displayedWord).toBeInTheDocument();
  });

  test('should display the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const displayedWord = await screen.findByText('coffee');
    expect(displayedWord).toBeInTheDocument();
  });
});

describe('Word definition: Phonetics', () => {
  test('should display phonetics of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const phoneticsText = await screen.findByText('Phonetic: /ˈkɑ.fi/');
    expect(phoneticsText).toBeInTheDocument();
  });

  test('should display phonetics of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const phoneticsText = await screen.findByText('Phonetic: /ˈkɑ.fi/');
    expect(phoneticsText).toBeInTheDocument();
  });
});

describe('Word definition: Noun', () => {
  test('should display noun definitions of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const nounText = await screen.findByText('noun');
    expect(nounText).toBeInTheDocument();

    const definitionText = await screen.findByText(
      'A beverage made by infusing the beans of the coffee plant in hot water.'
    );
    expect(definitionText).toBeInTheDocument();
  });

  test('should display noun definitions of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const nounText = await screen.findByText('noun');
    expect(nounText).toBeInTheDocument();

    const definitionText = await screen.findByText(
      'A beverage made by infusing the beans of the coffee plant in hot water.'
    );
    expect(definitionText).toBeInTheDocument();
  });
});

describe('Word definition: Verb', () => {
  test('should display verb definitions of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const verbText = await screen.findByText('verb');
    expect(verbText).toBeInTheDocument();

    const definitionText = await screen.findByText('To drink coffee.');
    expect(definitionText).toBeInTheDocument();
  });

  test('should display verb definitions of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const verbText = await screen.findByText('verb');
    expect(verbText).toBeInTheDocument();

    const definitionText = await screen.findByText('To drink coffee.');
    expect(definitionText).toBeInTheDocument();
  });
});

describe('Word definition: Adjective', () => {
  test('should display adjective definitions of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const adjectiveText = await screen.findByText('adjective');
    expect(adjectiveText).toBeInTheDocument();

    const definitionText = await screen.findByText(
      'Of a pale brown colour, like that of milk coffee.'
    );
    expect(definitionText).toBeInTheDocument();
  });

  test('should display adjective definitions of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const adjectiveText = await screen.findByText('adjective');
    expect(adjectiveText).toBeInTheDocument();

    const definitionText = await screen.findByText(
      'Of a pale brown colour, like that of milk coffee.'
    );
    expect(definitionText).toBeInTheDocument();
  });
});

describe('Word definition: Example', () => {
  test('should display "example" in definitions of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const exampleText = await screen.findByText(
      'Example: He did not stay for coffee.'
    );
    expect(exampleText).toBeInTheDocument();
  });

  test('should display "example" in definitions of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const exampleText = await screen.findByText(
      'Example: He did not stay for coffee.'
    );
    expect(exampleText).toBeInTheDocument();
  });
});

describe('Word definition: Synonyms', () => {
  test('should display synonyms of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Search for 'ephemeral'
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ephemeral');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    // Wait for the synonyms section to be displayed
    const synonymsSection = await screen.findByText(
      /Synonyms: evanescent, fleeting, momentary/i
    );
    expect(synonymsSection).toBeInTheDocument();
  });

  test('should display synonyms of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Search for 'ephemeral'
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ephemeral{Enter}');

    // Wait for the synonyms section to be displayed
    const synonymsSection = await screen.findByText(
      /Synonyms: evanescent, fleeting, momentary/i
    );
    expect(synonymsSection).toBeInTheDocument();
  });
});

describe('Word definition: Antonyms', () => {
  test('should display antonyms of the searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Search for 'ephemeral'
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ephemeral');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    // Wait for the antonyms section to be displayed
    const antonymsSection = await screen.findByText(
      /Antonyms: eternal, everlasting, permanent/i
    );
    expect(antonymsSection).toBeInTheDocument();
  });

  test('should display antonyms of the searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Search for 'ephemeral'
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ephemeral{Enter}');

    // Wait for the antonyms section to be displayed
    const antonymsSection = await screen.findByText(
      /Antonyms: eternal, everlasting, permanent/i
    );
    expect(antonymsSection).toBeInTheDocument();
  });
});

describe('Error messages', () => {
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

  test('should display error message when a non-existent word in the API is searched via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(searchInput, 'kaffe');
    await user.click(searchButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/Word not found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('should display error message when a non-existent word in the API is searched via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'kaffe{Enter}');

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/Word not found/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('Audio elements', () => {
  test('should render audio elements for words when available and verify that their source is correct', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'coffee{Enter}');

    const audioElements = await screen.findAllByLabelText('word pronunciation');
    expect(audioElements.length).toBeGreaterThan(0);

    expect(audioElements[0]).toHaveAttribute('src');
    expect(audioElements[0].src).toContain(
      'https://api.dictionaryapi.dev/media/pronunciations/en/coffee-uk.mp3'
    );
  });
});

describe('Add word as a favorite', () => {
  test('should be able to add a word as a favorite', async () => {
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

    // Click on the "Favorites" button to view the favorite list
    const viewFavoritesButton = screen.getByRole('button', {
      name: /favorites/i,
    });
    await user.click(viewFavoritesButton);

    // Check if the favorited word 'ephemeral' is in the favorite list
    const favoriteWord = await screen.findByText('ephemeral');
    expect(favoriteWord).toBeInTheDocument();
  });
});

describe('Unfavorite a word', () => {
  test('should be able to unfavorite a word', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Search for a word and add it to favorites
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ephemeral{Enter}');

    await waitFor(() =>
      expect(screen.getByText('ephemeral')).toBeInTheDocument()
    );

    const addToFavoritesButton = screen.getByRole('button', {
      name: /add to favorites/i,
    });
    await user.click(addToFavoritesButton);

    // Check that the button text changes to "Unfavorite"
    expect(
      screen.getByRole('button', { name: /unfavorite/i })
    ).toBeInTheDocument();

    // Click the "Unfavorite" button
    const unfavoriteButton = screen.getByRole('button', {
      name: /unfavorite/i,
    });
    await user.click(unfavoriteButton);

    // Verify that the button changes back to "Add to Favorites"
    expect(
      screen.getByRole('button', { name: /add to favorites/i })
    ).toBeInTheDocument();
  });
});

describe('Remove word from favorites', () => {
  test('should be able to remove a word from the favorite list', async () => {
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

    // Verify that 'ephemeral' is no longer in the favorites list
    expect(screen.queryByText('ephemeral')).not.toBeInTheDocument();
  });
});

describe('View saved word details in favorite list', () => {
  test('should expand word details for a specific word in favorite list when "See More" button is clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(searchInput, 'ephemeral');
    await user.click(searchButton);

    await waitFor(() =>
      expect(screen.getByText('ephemeral')).toBeInTheDocument()
    );

    const addToFavoritesButton = screen.getByRole('button', {
      name: /add to favorites/i,
    });
    await user.click(addToFavoritesButton);

    const viewFavoritesButton = screen.getByRole('button', {
      name: /favorites/i,
    });
    await user.click(viewFavoritesButton);

    const seeMoreButton = within(
      screen.getByText('ephemeral').closest('li')
    ).getByRole('button', { name: /see more/i });
    await user.click(seeMoreButton);

    // Verify that the additional details are showing
    const definition = await screen.findByText(
      'Something which lasts for a short period of time.'
    );
    expect(definition).toBeInTheDocument();
  });
});

describe('Light and dark mode', () => {
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
});
