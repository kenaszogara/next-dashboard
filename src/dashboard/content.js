import { useToggle } from './provider/context';

const style = {
  mainContainer: `duration-700 ease-out transition-all flex flex-col h-screen pl-0 w-full lg:pl-64 lg:space-y-4`,
  mainContainerStretch: `duration-500 ease-in transition-all flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4`,
};

export default function Content({ children }) {
  const { open, ref } = useToggle();
  return (
    <div
      ref={ref}
      className={`${open ? style.mainContainer : style.mainContainerStretch}`}
    >
      {children}
    </div>
  );
}
