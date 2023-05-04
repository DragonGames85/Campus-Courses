import axios from "axios";
import { create } from "zustand";
import { groupSchema } from "../types/groupSchema";

export const useGroupStore = create<groupSchema>()(set => ({
  isLoading: false,
  error: null,
  success: false,

  groups: [],

  getGroups: async () => {
    set({ isLoading: true, success: false });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get("groups", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ groups: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false, success: true });
    }
  },
}));
