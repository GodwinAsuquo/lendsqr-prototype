import { useLocation } from 'react-router-dom';
import notification from '../../assets/icons/notification.svg';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import pic from '@/assets/images/profileimage.png';
import { format } from 'date-fns';

interface TopNavProps {
  isCollapsed: boolean;
}

const TopNav = ({ isCollapsed }: TopNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().split('/').pop() || '';

const todayFormatted = format(new Date(), 'd MMM');

  // const storedUser = localStorage.getItem('GlosscareAdminUser');
  // const userDetails = storedUser ? JSON.parse(storedUser) : null;

  // const { firstName, lastName } = userDetails;

  return (
    <div className="flex items-center text-sm">
      <div
        className={`
          bg-white py-3 flex left-0 fixed top-0 right-0 
          items-center h-20 rounded-2xl justify-between
          md:px-10 px-4 z-40 transition-all duration-300 ease-in-out 
          ${isCollapsed ? 'lg:ml-[120px]' : 'lg:ml-80 '}
        `}
      >
        <h1 className="font-bold text-lg mr-10 truncate w-[20%]">
          {currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}
        </h1>

        <div className="flex w-fit items-center space-x-8">
         
      

          <img src={notification} alt="search icon" className="bg-[#F6F6F6] w-fit p-2 rounded-full" />

          <div className="flex items-center space-x-3">
            <p className="font-semibold text-nowrap">Eng (US)</p>
            <IoChevronDownOutline className="text-gray-400" />
          </div>

          <div className="space-x-2 flex items-center rounded-full px-3 py-1 bg-[#F6F6F6]">
            <FaCalendarAlt />
            <p className="text-nowrap">{todayFormatted}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-16">
              <img src={pic} alt="profile image" />
              {/* <div className="absolute bottom-0 right-1 w-3 h-3 rounded-full bg-[#00B884] border border-[#E1E1E1]"></div> */}
            </div>

            {/* <div className="text-sm">
              <h4 className="text-nowrap text-[#132050] font-semibold ">{firstName + ' ' + lastName}</h4>
              <p className="text-[#1320507A]">ADMIN</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
