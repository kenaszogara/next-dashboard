import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';
import Content from './content';
import { useToggle } from './provider/context';

const style = {
  container: `bg-gray-100 dark:bg-gray-700 h-screen overflow-hidden relative`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-64 lg:space-y-4`,
  mainContainerStretch: `flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4`,
};

export default function DashboardLayout({ children }) {
  return (
    <div className={style.container}>
      <div className="flex items-start">
        <Overlay />
        <SideNavigation mobilePosition="right" />
        <Content>
          <TopNavigation />
          <main className={style.main}>{children}</main>
        </Content>
      </div>
    </div>
  );
}
