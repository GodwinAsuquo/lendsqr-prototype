import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { FaBriefcase } from "react-icons/fa";
import { navItems, PRIVATE_PATHS, PUBLIC_PATHS } from "@/utils/constants";
import { ChevronLeft } from "lucide-react";

interface SideNavProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const SideNav = ({ isCollapsed, setIsCollapsed }: SideNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = () => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
    navigate(PUBLIC_PATHS.SIGNIN);
  };

  // Group navigation items by category
  const groupedNavItems = navItems.reduce((acc, item) => {
    const category = item.category || "OTHER";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={`fixed z-50 lg:z-0 left-0 top-0 bg-white h-screen shadow-xl flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-0 lg:w-[70px]" : "w-[283px]"}
          ${
            !isCollapsed
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Switch Organization Dropdown */}
        <div
          className={`relative mt-10 lg:mt-28  mb-6 ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-full flex items-center justify-between py-3 px-6 rounded-lg hover:bg-cyan-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <FaBriefcase className="text-[#213F7D] w-4 h-4" />
              <span className="text-[#213F7D] text-sm">
                Switch Organization
              </span>
            </div>
            <IoChevronDownOutline
              className={`text-[#213F7D] transition-transform ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {openDropdown && (
            <div className="absolute w-[90%] left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg z-50 p-2">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm text-[#545F7D]">
                Lendsqr
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm text-[#545F7D]">
                Irorun
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm text-[#545F7D]">
                Lendstar
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Link */}
        <div className={`mb-4 ${isCollapsed ? "mt-28" : ""}`}>
          <Link
            to={PRIVATE_PATHS.DASHBOARD}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsCollapsed(true);
              }
            }}
            className={`flex items-center ${
              isCollapsed ? "justify-center hidden lg:block" : "space-x-3"
            } 
              py-3 px-6 transition-colors
              ${
                location.pathname === PRIVATE_PATHS.DASHBOARD
                  ? "bg-cyan-50 border-l-4 border-[#39CDCC]"
                  : "hover:bg-gray-50"
              }`}
          >
            <HiOutlineHome className="w-5 h-5 text-[#213F7D] opacity-60" />
            {!isCollapsed && (
              <span className="text-[#213F7D] text-sm">Dashboard</span>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto pb-6 custom-scrollbar">
          {Object.entries(groupedNavItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              {!isCollapsed && (
                <p className="text-xs font-medium text-[#545F7D] mb-2 px-6">
                  {category}
                </p>
              )}
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isHovered = hoveredItem === item.path;

                  // Determine which icon to show
                  const iconToShow =
                    isActive || isHovered ? item.onIcon : item.icon;

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setIsCollapsed(true);
                          }
                        }}
                        onMouseEnter={() => setHoveredItem(item.path)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`flex items-center ${
                          isCollapsed
                            ? "justify-center hidden lg:block"
                            : "space-x-3"
                        } 
                          px-6 py-3 transition-all duration-200
                          ${
                            isActive
                              ? "bg-cyan-50 border-l-4 border-[#39CDCC]"
                              : "hover:bg-gray-50"
                          }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <img
                          src={iconToShow}
                          alt={item.name}
                          className="w-5 h-5 object-contain"
                        />
                        {!isCollapsed && (
                          <span
                            className={`text-sm ${
                              isActive || isHovered
                                ? "text-[#213F7D]"
                                : "text-[#545F7D]/70"
                            }`}
                          >
                            {item.name}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "space-x-3"
              } 
                w-full px-3 py-2 rounded-lg transition-colors hover:bg-red-50 group`}
              title={isCollapsed ? "Logout" : undefined}
            >
              <HiOutlineLogout className="w-5 h-5 text-[#213F7D] opacity-60 group-hover:text-red-500" />
              {!isCollapsed && (
                <span className="text-base text-[#545F7D] group-hover:text-red-500">
                  Logout
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Collapse/Expand Button - Desktop Only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-28 bg-[#39CDCC] rounded-full p-1.5 
    shadow-md hover:bg-[#2ebaba] transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`w-4 h-4 text-white transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>
    </>
  );
};

export default SideNav;
