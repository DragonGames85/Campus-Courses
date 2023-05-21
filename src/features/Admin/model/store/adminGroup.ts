import axios from "axios";
import { create } from "zustand";
import { adminGroupSchema } from "../types/adminGroupSchema";

export const useAdminGroupStore = create<adminGroupSchema>()(set => ({
  isLoading: false,

  createError: null,
  updateError: null,
  deleteError: null,

  isCreated: false,
  isDeleted: false,
  isUpdated: false,

  updateGroup: async (id, name) => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.put(
        `groups/${id}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ updateError: null, isUpdated: true });
    } catch (error) {
      if (axios.isAxiosError(error))
        set({ updateError: error, isUpdated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addGroup: async name => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        "groups",
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ createError: null, isCreated: true });
    } catch (error) {
      if (axios.isAxiosError(error))
        set({ createError: error, isCreated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteGroup: async id => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.delete(`groups/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ deleteError: null, isDeleted: true });
    } catch (error) {
      if (axios.isAxiosError(error))
        set({ deleteError: error, isDeleted: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
