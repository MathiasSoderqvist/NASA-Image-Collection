import { render, screen } from '@testing-library/react';
import SearchPage from './Components/SearchPage';
import ShowPage from './Components/ShowPage';

test('renders search page', () => {
  render(<SearchPage />);
  const linkElement = screen.getByText(/image collection/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders search button', () => {
  render(<SearchPage />);
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders back button', () => {
  render(<ShowPage />);
  const linkElement = screen.getByText(/back to search/i);
  expect(linkElement).toBeInTheDocument();
});