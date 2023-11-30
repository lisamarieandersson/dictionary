// Unit tests for SearchForm component

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import SearchForm from '../components/SearchForm';

// Verifying that the input field correctly accepts and displays user-typed text
test('should allow user to type in the search input', async () => {
  render(<SearchForm />);
  const user = userEvent.setup();
  const searchInput = screen.getByRole('textbox');

  await user.type(searchInput, 'asd');

  expect(searchInput).toHaveValue('asd');
});

// Triggers the search function with the input value when the form is submitted
test('should call onSearch with input value on submission', async () => {
  const mockOnSearch = vi.fn();
  render(<SearchForm onSearch={mockOnSearch} />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await user.type(searchInput, 'test');
  await user.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith('test');
});

test('should display a validation error for empty submission via click', async () => {
  const mockOnSearch = vi.fn();
  render(<SearchForm onSearch={mockOnSearch} />);
  const user = userEvent.setup();

  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(
    screen.getByText(/Please enter a word to search\./i)
  ).toBeInTheDocument();
  expect(mockOnSearch).not.toHaveBeenCalled();
});

test('should display a validation error for empty submission via enter', async () => {
  const mockOnSearch = vi.fn();
  render(<SearchForm onSearch={mockOnSearch} />);
  const user = userEvent.setup();

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, '{Enter}');

  expect(
    screen.getByText(/Please enter a word to search\./i)
  ).toBeInTheDocument();
  expect(mockOnSearch).not.toHaveBeenCalled();
});
