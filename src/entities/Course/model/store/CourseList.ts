import axios from "axios";
import { create } from "zustand";
import { courseListSchema } from "../types/courseList";

export const useCourseListStore = create<courseListSchema>()(set => ({
  isLoading: false,
  error: null,
  success: false,
  courses: [],

  myCourses: [],
  teachingCourses: [],

  getTeachingCourses: async () => {
    set({ isLoading: true, success: false });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get("courses/teaching", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ teachingCourses: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false, success: true });
    }
  },

  getMyCourses: async () => {
    set({ isLoading: true, success: false });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get("courses/my", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ myCourses: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false, success: true });
    }
  },

  getCoursesByGroup: async (id: string) => {
    set({ isLoading: true, success: false });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`groups/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ courses: response.data, error: null });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false, success: true });
    }
  },
}));
