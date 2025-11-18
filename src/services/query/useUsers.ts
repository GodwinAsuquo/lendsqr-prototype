import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users.service";

export const useUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });
};
