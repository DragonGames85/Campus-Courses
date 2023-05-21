import axios from "axios";
import { create } from "zustand";
import { signUpSchema } from "../types/signUpSchema";

export const useSignStore = create<signUpSchema>()(set => ({
  isLoading: false,
  error: null,
  isSuccess: false,
  
  signUp: async id => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        `courses/${id}/sign-up`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ error: null, isSuccess: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error, isSuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
