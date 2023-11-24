import { render, screen } from '@testing-library/react';
import App from './App';

test('should have "Hello World"', () => {
  render(<App />);
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeVisible();
}); // Medvetet feltest!!!
