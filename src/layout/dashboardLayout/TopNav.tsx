import { useState } from "react";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import logo from "@/assets/images/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { PUBLIC_PATHS } from "@/utils/constants";

interface TopNavProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const TopNav = ({ isCollapsed, setIsCollapsed }: TopNavProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const userDetails = {
    name: "Adedeji",
    email: "adedeji@lendsqr.com",
    avatar: "/avatar.jpg",
  };

  return (
    <header className="fixed top-0 right-0 z-30 bg-white shadow-sm transition-all duration-300 w-full">
      <div className="flex items-center justify-between h-[100px] px-4 lg:px-8">
        {/* Mobile Menu Toggle & Page Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <HiMenuAlt2 className="w-6 h-6 text-[#213F7D]" />
          </button>

          <div className="w-32">
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-[400px] mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-12 rounded-lg border border-gray-200 
                focus:outline-none focus:border-[#39CDCC] transition-colors
                placeholder:text-[#545F7D] placeholder:text-sm"
            />
            <button
              className="absolute right-0 top-0 h-10 px-4 bg-[#39CDCC] 
                rounded-r-lg hover:bg-[#2ebaba] transition-colors"
              aria-label="Search"
            >
              <IoSearchOutline className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Docs Link - Desktop Only */}
          <a
            href="/docs"
            className="hidden lg:block text-[#213F7D] hover:text-[#39CDCC] 
              transition-colors text-sm underline"
          >
            Docs
          </a>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <IoNotificationsOutline className="w-6 h-6 text-[#213F7D]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#39CDCC] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {userDetails.name.charAt(0)}
                  </span>
                </div>
                <span className="hidden lg:block text-[#213F7D] font-medium">
                  {userDetails.name}
                </span>
                <FaCaretDown className="hidden lg:block text-[#213F7D]" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-64 p-0 bg-white border border-gray-100 shadow-lg"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-[#213F7D]">
                  {userDetails.name}
                </p>
                <p className="text-xs text-[#545F7D] mt-1">
                  {userDetails.email}
                </p>
              </div>
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-[#545F7D] hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-[#545F7D] hover:bg-gray-50 transition-colors">
                  Settings
                </button>
              </div>
              <div onClick={()=>navigate(PUBLIC_PATHS.SIGNIN)} className="border-t border-gray-100">
                
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-4 pr-12 rounded-lg border border-gray-200 
              focus:outline-none focus:border-[#39CDCC] transition-colors
              placeholder:text-[#545F7D] placeholder:text-sm"
          />
          <button
            className="absolute right-0 top-0 h-10 px-4 bg-[#39CDCC] 
              rounded-r-lg hover:bg-[#2ebaba] transition-colors"
            aria-label="Search"
          >
            <IoSearchOutline className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
