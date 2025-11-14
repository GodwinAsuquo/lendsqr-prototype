import { type ReactNode, useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface DashboardProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="w-screen h-screen ">
      <TopNav isCollapsed={isCollapsed} />
      <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`mx-auto mt-32 transition-all mr-10 duration-300 ease-in-out
          ${isCollapsed ? 'lg:ml-[120px]' : 'lg:ml-80'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
