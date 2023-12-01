import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  test('should render the correct headline in header', () => {
    render(<Header />);
    expect(screen.getByText('Dictionary')).toBeInTheDocument();
  });
});
