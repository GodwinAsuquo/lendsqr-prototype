import axios from "axios";
import { GET_USERS } from "../apiUrls";

export const getUsers = async () => {
  const res = await axios.get(GET_USERS);
  return res.data;
};
