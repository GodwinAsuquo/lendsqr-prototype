import UsersTable from "@/components/pageComponents/users/UsersTable";
import { statsCards } from "@/utils/constants";
import { useUsers } from "@/services/query/useUsers";

const Users = () => {
  const { data: users, isLoading, isError } = useUsers();
console.log({users});

  return (
    <div className="p-4 lg:pb-8 lg:px-8 mb-56">
      <h2 className="text-2xl font-medium text-[#213F7D] mb-10">Users</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-sm p-5 shadow-sm border border-gray-100"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <img src={card.icon} alt={card.title} />
            </div>
            <p className="text-[#545F7D] tracking-wide text-sm font-medium mb-2">
              {card.title}
            </p>
            <p className="text-[#213F7D] text-xl font-medium">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Loading/Error State */}
      {isLoading && (
        <p className="text-center text-gray-600 py-20">Loading users...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 py-20">Failed to load users.</p>
      )}

      {/* Users Table */}
      {users && <UsersTable users={users} />}
    </div>
  );
};

export default Users;
