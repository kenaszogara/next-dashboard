import { forwardRef } from 'react';

export const OutlineButtonPage = () => (
  <div className="space-x-2 mb-4 md:space-x-6 space-y-3">
    <OutlinedButton color="primary">Primary</OutlinedButton>
    <OutlinedButton color="success">Success</OutlinedButton>
    <OutlinedButton color="danger">Danger</OutlinedButton>
    <OutlinedButton color="warning">Warning</OutlinedButton>
    <OutlinedButton color="dark">Dark</OutlinedButton>
    <OutlinedButton color="indigo">Indigo</OutlinedButton>
  </div>
);

export const OutlinedButton = forwardRef(
  ({ children, color, faIcon, size, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={`${colors[color]} ${
        size ? sizes[size] : sizes.md
      } text-white focus:outline-none shadow rounded px-6 py-2 font-medium `}
    >
      {faIcon && <i className={faIcon}></i>}
      {children}
    </button>
  ),
);

const colors = {
  primary: `border-blue-700 border-2 text-blue-700 active:bg-blue-700 active:text-white`,
  success: `border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`,
  danger: `border-red-600 border-2 text-red-600 active:bg-red-600 active:text-white`,
  dark: `border-black border-2 text-gray-900 active:bg-black active:text-white`,
  warning: `border-yellow-500 border-2 text-yellow-500 active:bg-yellow-500 active:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
};

const sizes = {
  sm: 'px-6 py-1 text-sm',
  md: 'px-6 py-2',
  lg: 'px-6 py-3 text-lg',
};
