import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../Header';
import ThemeToggle from '../ThemeToggle';

test('should have "Hello World"', () => {
  render(<App />);
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeVisible();
});

test('should have header with text "Dictionary"', () => {
  render(<Header />);
  const text = screen.getByText('Dictionary');
  expect(text).toBeInTheDocument();
});

describe('ThemeToggle', () => {
  it('should toggle theme when checkbox is clicked', async () => {
    const toggleTheme = vi.fn();
    const { getByRole } = render(
      <ThemeToggle theme="light" toggleTheme={toggleTheme} />
    );

    // Use getByRole to find the checkbox
    const checkbox = getByRole('checkbox');

    // Use userEvent to click the checkbox
    await userEvent.click(checkbox);

    // Assert that toggleTheme was called
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
