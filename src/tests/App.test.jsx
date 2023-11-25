import { render, screen } from '@testing-library/react';
import App from '../App';

test('should have "Dictionary"', () => {
  render(<App />);
  const message = screen.queryByText(/Dictionary/i);
  expect(message).toBeVisible();
});
