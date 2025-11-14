// import { settingsItems, navItems } from '../../utils/constants';
// import { useLocation, useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import profileImage from '@/assets/images/profileimage.png';
// import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import CustomModal from '@/components/shared/CustomModal';

interface SideNavProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const SideNav = ({ isCollapsed, setIsCollapsed }: SideNavProps) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [openIndex, setOpenIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [settingsHoveredIndex, setSettingsHoveredIndex] = useState<number | null>(null);

  const handleLogout = ()=> {
    console.log('Logged out successfully ');
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 bg-[#F3F9FD] h-screen ml-5 mt-5 rounded-xl  flex flex-col
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-[70px] px-2" : "w-[280px] px-4"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-12 bg-primary border  border-primary rounded-lg p-1.5 cursor-pointer"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <MdChevronRight className="w-4 h-4 text-white" />
        ) : (
          <MdChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      <div className="text-center mt-10">
        <img src={profileImage} alt="profile image" className="w-20 mx-auto" />
        <div className={`${isCollapsed ? "hidden" : ""}`}>
          <p className="text-primary font-semibold">Administrator</p>
        </div>
      </div>

      <hr className="border border-primary mt-8" />

      <nav className="flex-1 overflow-y-auto pb-16 mt-2 scrollbar-hide">
        <p
          className={`text-black/50 text-sm mt-7 ${
            isCollapsed ? "hidden" : "pl-3"
          }`}
        >
          MAIN
        </p>
        {/* <ul className={` text-sm mt-3 space-y-2`}>
          {navItems.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  navigate(item.path);
                  setOpenIndex(i === openIndex ? -1 : i);
                  setIsCollapsed(false);
                  if (item.name === "Blogs") {
                    window.open("https://glosscares.sanity.studio/", "_blank");
                  }
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                title={isCollapsed ? item.name : ""}
                className={`flex justify-between items-center  ${
                  isCollapsed ? "justify-center p-3 w-fit" : "p-3 w-full "
                } 
                  rounded-lg transition-colors
                  ${
                    location.pathname.includes(item.path)
                      ? "bg-primary text-white"
                      : "text-black/50 hover:bg-primary hover:text-white"
                  }`}
              >
                <div className="flex items-center">
                  <img
                    src={
                      location.pathname.includes(item.path) ||
                      hoveredIndex === i
                        ? item.lightIcon
                        : item.icon
                    }
                    alt={item.name}
                    className="w-5 h-5"
                  />
                  {!isCollapsed && (
                    <span className="ml-1 font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>

                {item.subMenus && (
                  <div
                    className={`ml-2 duration-300 ease-in-out ${
                      isCollapsed || i === 5 ? "hidden" : ""
                    } ${i === openIndex ? "" : "rotate-180"}`}
                  >
                    <IoIosArrowUp />
                  </div>
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
    ${openIndex === i && item.subMenus ? "ml-10 max-h-[500px]" : "max-h-0"}
    ${isCollapsed ? "hidden" : ""}`}
              >
                <ul className=" text-black/50 mt-3 mb-5 duration-200 ease-in-out transition-all transform cursor-pointer space-y-2">
                  {item.subMenus?.map((d, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(d.path);
                        }}
                        className={` rounded-lg  py-3 px-6 ${
                          location.pathname.includes(d.path)
                            ? "bg-primary text-white"
                            : "text-black/50 hover:bg-primary hover:text-white"
                        }`}
                      >
                        <li className=" list-disc">{d.name}</li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul> */}

        <hr className="border border-primary mt-8" />

        {/* <p className={`text-black/50 text-sm mt-7 ${isCollapsed ? 'hidden' : 'pl-3'}`}>SETTINGS</p> */}
        {/* <ul className={`text-sm mt-3 space-y-2`}>
          {settingsItems.map((item:any, i:number) => (
            <li key={i}>
              <button
                onClick={() => {
                  navigate(item.path);
                  setIsCollapsed(false);
                  if (item.name === "Logout Account") {
                    setIsModalOpen(true);
                  }
                }}
                onMouseEnter={() => setSettingsHoveredIndex(i)}
                onMouseLeave={() => setSettingsHoveredIndex(null)}
                title={isCollapsed ? item.name : ""}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center p-3" : "pl-3 py-3"
                } 
                  rounded-lg transition-colors
                  ${
                    location.pathname.includes(item.path)
                      ? "bg-primary text-white"
                      : "text-black/50 hover:bg-primary hover:text-white"
                  } ${
                  item.name === "Logout Account" &&
                  "text-[#CC8889] hover:text-white"
                }`}
              >
                <img
                  src={
                    location.pathname.includes(item.path) ||
                    settingsHoveredIndex === i
                      ? item.lightIcon
                      : item.icon
                  }
                  alt={item.name}
                  className="w-5 h-5"
                />
                {!isCollapsed && (
                  <span className={`ml-1 font-medium whitespace-nowrap `}>
                    {item.name}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul> */}
      </nav>

      {isModalOpen && (
        <CustomModal
          onClose={() => setIsModalOpen(false)}
          className="lg:w-[25%]"
        >
          <div className="text-center p-14 space-y-3">
            <h3 className="font-bold">Are you sure you want to Logout?</h3>
            <div onClick={handleLogout}>
              <button className="bg-destructive text-white w-full">
                Yes, Logout
              </button>
            </div>
            <div onClick={() => setIsModalOpen(false)}>
              <button
                className={` hover:bg-opacity-[80%] ease-in-out duration-300 text-[#3A3A3C] text-sm border-2 border-[#E3EDFF] px-6 py-2 rounded-full w-full bg-[#F2F2F5]`}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </aside>
  );
};

export default SideNav;
