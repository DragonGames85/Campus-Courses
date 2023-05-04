import { courseSchema } from "../types/courseSchema";
import axios from "axios";
import { create } from "zustand";

export const useCourseStore = create<courseSchema>()(set => ({
  isLoading: false,
  error: null,
  course: null,
  success: false,

  getCourseById: async id => {
    set({ isLoading: true, success: false });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`courses/${id}/details`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ course: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false, success: true });
    }
  },
}));
