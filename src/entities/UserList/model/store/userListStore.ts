import { create } from "zustand";
import { userListSchema } from "../types/userListSchema";
import axios from "axios";

export const useUserListStore = create<userListSchema>()(set => ({
  error: null,
  isLoading: false,
  users: [],

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get("users", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ users: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
