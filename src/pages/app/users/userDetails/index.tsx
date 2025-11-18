import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import { tabs } from "@/utils/constants";
import { useUsers } from "@/services/query/useUsers";
import type { Guarantor, UserData } from "@/types";



const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("general");

  const { data: users, isLoading } = useUsers();

  if (isLoading) return <p>Loading...</p>;

  const userData:UserData = users?.find((u: UserData) => String(u.id) === String(id));

  if (!userData) return <p>User not found</p>;


  
  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((star) => (
          <span key={star}>
            {star <= count ? (
              <FaStar className="text-yellow-500 w-4 h-4" />
            ) : (
              <FaRegStar className="text-yellow-500 w-4 h-4" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <div className="px-6 lg:px-8 py-6">
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/users")}
          className="flex items-center gap-2 text-[#545F7D] hover:text-[#213F7D] transition-colors mb-8"
        >
          <IoArrowBack className="w-5 h-5" />
          <span className="text-sm">Back to Users</span>
        </button>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <h1 className="text-2xl font-medium text-[#213F7D] mb-4 lg:mb-0">
            User Details
          </h1>
          <div className="flex justify-between gap-4 ">
            <button className="px-5 py-2 border border-[#E4033B] text-[#E4033B] rounded-lg text-xs md:text-sm font-semibold tracking-wider hover:bg-red-50 transition-colors">
              BLACKLIST USER
            </button>
            <button className="px-5 py-2 border border-[#39CDCC] text-[#39CDCC] rounded-lg text-xs md:text-sm font-semibold tracking-wider hover:bg-teal-50 transition-colors">
              ACTIVATE USER
            </button>
          </div>
        </div>

        {/* User Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Avatar and Name */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-[#213F7D]/10 flex items-center justify-center">
                <svg
                  width="32"
                  height="36"
                  viewBox="0 0 32 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 18C20.4183 18 24 14.4183 24 10C24 5.58172 20.4183 2 16 2C11.5817 2 8 5.58172 8 10C8 14.4183 11.5817 18 16 18Z"
                    fill="#213F7D"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16 20C7.16344 20 0 27.1634 0 36H32C32 27.1634 24.8366 20 16 20Z"
                    fill="#213F7D"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#213F7D]">
                  {userData.personalInformation.fullName}
                </h2>
                <p className="text-sm text-[#545F7D] mt-1">LSQFf587g90</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-20 bg-[#545F7D]/20"></div>

            {/* User's Tier */}
            <div>
              <p className="text-sm text-[#545F7D] mb-2">User's Tier</p>
              {renderStars(2)}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-20 bg-[#545F7D]/20"></div>

            {/* Balance */}
            <div>
              <h3 className="text-xl font-medium text-[#213F7D]">
                ₦200,000.00
              </h3>
              <p className="text-xs text-[#213F7D] mt-1">
                9912345678/Providus Bank
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-5 text-sm font-normal whitespace-nowrap transition-all relative ${
                  activeTab === tab.id
                    ? "text-[#39CDCC] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#39CDCC]"
                    : "text-[#545F7D] hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "general" && (
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-base font-medium text-[#213F7D] mb-8">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Full Name
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Phone Number
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Email Address
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.emailAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        BVN
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.bvn}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Gender
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Marital Status
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.maritalStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Children
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.children}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Type of Residence
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.personalInformation.typeOfResidence}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-[#213F7D]/10" />

                {/* Education and Employment */}
                <div>
                  <h3 className="text-base font-medium text-[#213F7D] mb-8">
                    Education and Employment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Level of Education
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.levelOfEducation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Employment Status
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.employmentStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Sector of Employment
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.sectorOfEmployment}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Duration of Employment
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.durationOfEmployment}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Office Email
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.officeEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Monthly Income
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.monthlyIncome}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Loan Repayment
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.educationAndEmployment.loanRepayment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-[#213F7D]/10" />

                {/* Socials */}
                <div>
                  <h3 className="text-base font-medium text-[#213F7D] mb-8">
                    Socials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Twitter
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.socials.twitter}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Facebook
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.socials.facebook}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#545F7D] uppercase mb-2">
                        Instagram
                      </p>
                      <p className="text-sm font-medium text-[#545F7D]">
                        {userData.socials.instagram}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-[#213F7D]/10" />

                {/* Guarantor */}
                <div>
                  <h3 className="text-base font-medium text-[#213F7D] mb-8">
                    Guarantor
                  </h3>
                  {userData?.guarantor.map(
                    (guarantor: Guarantor, index: number) => (
                      <div key={index} className={index > 0 ? "mt-8" : ""}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                          <div>
                            <p className="text-xs text-[#545F7D] uppercase mb-2">
                              Full Name
                            </p>
                            <p className="text-sm font-medium text-[#545F7D]">
                              {guarantor.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#545F7D] uppercase mb-2">
                              Phone Number
                            </p>
                            <p className="text-sm font-medium text-[#545F7D]">
                              {guarantor.phoneNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#545F7D] uppercase mb-2">
                              Email Address
                            </p>
                            <p className="text-sm font-medium text-[#545F7D]">
                              {guarantor.emailAddress}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#545F7D] uppercase mb-2">
                              Relationship
                            </p>
                            <p className="text-sm font-medium text-[#545F7D]">
                              {guarantor.relationship}
                            </p>
                          </div>
                        </div>
                        {index === 0 && userData.guarantor.length > 1 && (
                          <hr className="border-[#213F7D]/10 mt-8" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-[#545F7D]">
                  Documents content coming soon...
                </p>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-[#545F7D]">
                  Bank Details content coming soon...
                </p>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-[#545F7D]">Loans content coming soon...</p>
              </div>
            )}

            {activeTab === "savings" && (
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-[#545F7D]">Savings content coming soon...</p>
              </div>
            )}

            {activeTab === "app" && (
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-[#545F7D]">
                  App and System content coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
