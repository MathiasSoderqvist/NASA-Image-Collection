import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';


test('renders search page', () => {
  render(<App />);
  const linkElement = screen.getByText(/image collection/i);
  expect(linkElement).toBeInTheDocument();
});

test('input renders as expected', () => {
  render(<App />);
  expect(screen.getByTestId('my-input')).toBeInTheDocument()
});

test('button renders as expected', () => {
  render(<App />);
  expect(screen.getByTestId('my-button')).toBeInTheDocument()
});

test('typing in input', () => {
  render(<App />);

  // below line is a workaround for Material UI
  // eslint-disable-next-line testing-library/no-node-access
  const input = screen.getByTestId('my-input').querySelector('input');
  fireEvent.change(input, {
    target: { value: 'test' }
  });

  expect(input.value).toBe('test');
});


