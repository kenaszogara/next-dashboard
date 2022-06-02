import { forwardRef } from 'react';

export const ButtonPage = () => (
  <div className="space-x-1 mb-4 md:space-x-6 space-y-3">
    <Button color="primary">Primary</Button>
    <Button color="success">Success</Button>
    <Button color="danger">Danger</Button>
    <Button color="warning">Warning</Button>
    <Button color="dark">Dark</Button>
    <Button color="indigo">Indigo</Button>
  </div>
);

/* Logic */

export const Button = forwardRef(
  ({ color, children, size, faIcon, rounded, ...props }, ref) => (
    <button
      ref={ref}
      className={`${style.default} ${style.color[color]} ${
        size ? sizes[size] : sizes.md
      }
      
      ${rounded ? 'rounded-full' : 'rounded'}
      
      `}
      {...props}
    >
      {faIcon && <i className={faIcon}></i>}
      {children}
    </button>
  ),
);

export const ActionButton = forwardRef(
  ({ color, children, size, faIcon, rounded, ...props }, ref) => (
    <button
      ref={ref}
      className={`${style.action} ${style.color[color]}
      
      ${rounded ? 'rounded-full' : 'rounded'}
      
      `}
      {...props}
    >
      {faIcon && <i className={faIcon}></i>}
      {children}
    </button>
  ),
);

/* You can replace those colors with your own*/
const style = {
  action: `rounded-full text-center text-gray-100 w-8 h-8 shadow mx-1`,
  default: `text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200`,
  color: {
    primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-100`,
    success: `bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100`,
    danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
    dark: `bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-100`,
    warning: `bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-100`,
    indigo: `bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100`,
  },
};

const sizes = {
  sm: 'px-6 py-1 text-sm',
  md: 'px-6 py-2',
  lg: 'px-6 py-3 text-lg',
};
