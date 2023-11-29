import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import SearchForm from '../components/SearchForm';

test('should accept a user typing', async () => {
  render(<SearchForm />);
  const user = userEvent.setup();
  const searchInput = screen.getByRole('textbox');

  await user.type(searchInput, 'asd');

  expect(searchInput).toHaveValue('asd');
});
