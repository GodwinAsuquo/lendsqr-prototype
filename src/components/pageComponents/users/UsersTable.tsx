import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoFilterSharp,
  IoEllipsisVertical,
  IoEyeOutline,
} from "react-icons/io5";
import { FiUserX, FiUserCheck } from "react-icons/fi";
import type { FilterValues, UserData, UserStatus } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterModal from "./FilterModal";

interface UsersTableProps {
  users: UserData[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFiltered, setIsFiltered] = useState(false);

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Blacklisted":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleFilter = (filters: FilterValues) => {
    let filtered = users;

    if (filters.organization && filters.organization !== "all") {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }
    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.personalInformation.fullName
          .toLowerCase()
          .includes(filters.username.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.personalInformation.emailAddress
          .toLowerCase()
          .includes(filters.email.toLowerCase())
      );
    }
    if (filters.phoneNumber) {
      filtered = filtered.filter((user) =>
        user.personalInformation.phoneNumber.includes(filters.phoneNumber)
      );
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }
    if (filters.date) {
      // Convert date to string format matching your data
      const filterDate = filters.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      filtered = filtered.filter((user) => user.dateJoined === filterDate);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
    setIsFiltered(true);
  };

  const resetFilter = () => {
    setFilteredUsers(users);
    setCurrentPage(1);
    setIsFiltered(false);
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const thead = [
    "Organization",
    "Username",
    "Email",
    "Phone Number",
    "Date Joined",
    "Status",

  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100">
              {thead.map((d, i) => {
                return (
                  <th key={i} className="text-left px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#545F7D] uppercase">
                        {d}
                      </span>
                      <FilterModal
                        onFilter={handleFilter}
                        onReset={resetFilter}
                      >
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <IoFilterSharp className="w-4 h-4 text-[#545F7D]" />
                        </button>
                      </FilterModal>
                    </div>
                  </th>
                );
              })}
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <IoFilterSharp className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-[#213F7D]">
                        No results found
                      </p>
                      <p className="text-sm text-[#545F7D]">
                        {isFiltered
                          ? "No users match your filter criteria. Try adjusting your filters."
                          : "No users available."}
                      </p>
                    </div>
                    {isFiltered && (
                      <button
                        onClick={resetFilter}
                        className="mt-4 px-4 py-2 bg-[#39CDCC] text-white text-sm rounded-lg hover:bg-[#2ebaba] transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#213F7D1A] hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm text-[#545F7D] whitespace-nowrap">
                    {user.organization}
                  </td>
                  <td className="px-6 py-5 text-sm text-[#545F7D] whitespace-nowrap">
                    {user.personalInformation.fullName}
                  </td>
                  <td className="px-6 py-5 text-sm text-[#545F7D] whitespace-nowrap">
                    {user.personalInformation.emailAddress}
                  </td>
                  <td className="px-6 py-5 text-sm text-[#545F7D] whitespace-nowrap">
                    {user.personalInformation.phoneNumber}
                  </td>
                  <td className="px-6 py-5 text-sm text-[#545F7D] whitespace-nowrap">
                    {user.dateJoined}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-light ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <IoEllipsisVertical className="w-5 h-5 text-[#545F7D]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-48 p-0 bg-white border border-gray-100 shadow-lg"
                      >
                        <div className="py-2">
                          <button
                            onClick={() => handleViewDetails(user.id)}
                            className="w-full text-left px-4 py-2 text-sm text-[#545F7D] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <IoEyeOutline className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-[#545F7D] hover:bg-gray-50 flex items-center gap-3 transition-colors">
                            <FiUserX className="w-4 h-4" />
                            <span>Blacklist User</span>
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-[#545F7D] hover:bg-gray-50 flex items-center gap-3 transition-colors">
                            <FiUserCheck className="w-4 h-4" />
                            <span>Activate User</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#545F7D]">Showing</span>
            <select
              className="px-4 py-2 bg-[#213F7D]/5 border-none rounded text-sm text-[#545F7D] font-medium focus:outline-none focus:ring-1 focus:ring-[#39CDCC] appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23545F7D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
              }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-[#545F7D]">
              out of {filteredUsers.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded bg-[#213F7D]/5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#213F7D]/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8.75 3.5L5.25 7L8.75 10.5"
                  stroke="#545F7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {generatePageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-1 text-[#545F7D]/60"
                    >
                      ...
                    </span>
                  );
                }

                const pageNumber = page as number;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`min-w-7 h-7 px-2 flex items-center justify-center rounded text-sm font-normal transition-colors ${
                      currentPage === pageNumber
                        ? "bg-[#213F7D]/10 text-[#545F7D] font-medium"
                        : "text-[#545F7D]/60 hover:bg-[#213F7D]/5"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded bg-[#213F7D]/5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#213F7D]/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5.25 3.5L8.75 7L5.25 10.5"
                  stroke="#545F7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
