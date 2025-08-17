// src/components/InputField/InputField.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField Component', () => {
  it('renders label and placeholder', () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<InputField label="Email" onChange={handleChange} />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when invalid', () => {
    render(<InputField label="Email" invalid errorMessage="Invalid" />);
    expect(screen.getByText(/invalid/i)).toBeInTheDocument();
  });

  it('clear button clears the input', () => {
    let value = 'abc';
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    render(<InputField label="Clear" value={value} onChange={handleChange} showClearButton />);
    const button = screen.getByLabelText(/clear input/i);
    fireEvent.click(button);
    // After clicking clear, value should be empty string
    expect(value).toBe('');
  });

  it('toggles password visibility', () => {
    render(
      <InputField
        label="Password"
        type="password"
        showPasswordToggle
        value=""
        onChange={() => {}}
      />
    );
    const toggleBtn = screen.getByLabelText(/show password/i);
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText(/hide password/i)).toBeInTheDocument();
  });
});
