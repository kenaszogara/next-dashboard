import { forwardRef } from 'react';

const style = {
  container: `flex flex-row w-full px-2 py-2 text-md items-center rounded bg-purple-100 text-purple-800`,
  icon: `fas fa-search`,
  input: `bg-transparent w-96 focus:outline-none`,
};

export const SearchBar = forwardRef(({ hintText, name, ...props }, ref) => (
  <div className={style.container}>
    <i className={`${style.icon} mr-2`}></i>
    <input
      id={name}
      name={name}
      type="text"
      className={style.input}
      placeholder={hintText}
      ref={ref}
      {...props}
    />
  </div>
));
