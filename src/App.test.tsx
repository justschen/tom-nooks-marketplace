import { render, screen } from '@testing-library/react';
import App from './App';

test('renders marketplace heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Tom Nook's Marketplace/i);
  expect(headingElement).toBeInTheDocument();
});
