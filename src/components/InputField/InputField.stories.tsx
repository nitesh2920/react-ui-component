// src/components/InputField/InputField.stories.tsx
import  { useState } from 'react';
import type { Meta,StoryFn } from '@storybook/react';
import InputField from './InputField';
import type { InputFieldProps } from './InputField.types';
export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <div style={{ padding: '20px', background: args.theme === 'dark' ? '#1a202c' : '#fff' }}>
      <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Name',
  placeholder: 'Enter your name',
  helperText: 'Helper text',
  variant: 'outlined',
  size: 'md',
  theme: 'light',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  invalid: true,
  errorMessage: 'Invalid email address',
  variant: 'outlined',
  size: 'md',
  theme: 'light',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  value: 'Cannot edit',
  disabled: true,
  variant: 'filled',
  size: 'md',
  theme: 'light',
};

export const PasswordToggle = Template.bind({});
PasswordToggle.args = {
  label: 'Password',
  placeholder: 'Enter password',
  type: 'password',
  showPasswordToggle: true,
  variant: 'outlined',
  size: 'md',
  theme: 'light',
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: 'Clearable Input',
  placeholder: 'Type something...',
  showClearButton: true,
  variant: 'filled',
  size: 'md',
  theme: 'light',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  label: 'Dark Mode Input',
  placeholder: 'Dark mode enabled',
  variant: 'outlined',
  size: 'md',
  theme: 'dark',
};
