import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
  it('should toggle theme when checkbox is clicked', async () => {
    const toggleTheme = vi.fn();
    const { getByRole } = render(
      <ThemeToggle theme="light" toggleTheme={toggleTheme} />
    );

    // Check that the initial text is correct for light mode
    expect(screen.getByText('Light Mode')).toBeInTheDocument();

    // Use getByRole to find the checkbox
    const checkbox = getByRole('checkbox');

    // Use userEvent to click the checkbox
    await userEvent.click(checkbox);

    // Assert that toggleTheme was called
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
