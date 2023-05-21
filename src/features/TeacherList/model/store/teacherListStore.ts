import axios from "axios";
import { create } from "zustand";
import { teacherListSchema } from "../types/teacherListSchema";

export const useTeacherListStore = create<teacherListSchema>()(set => ({
  isLoading: false,
  error: null,
  isSuccess: false,

  addTeacher: async (id: string, userId: string) => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(
        `courses/${id}/teachers`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Response status was not 200");
      } else {
        set({ error: null, isSuccess: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error, isSuccess: false });
        setTimeout(() => {
          set({ error: null });
        }, 5000);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
