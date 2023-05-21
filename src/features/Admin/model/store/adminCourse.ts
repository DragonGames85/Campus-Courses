import axios from "axios";
import { create } from "zustand";
import { adminCourseSchema } from "../types/adminCourseSchema";

export const useAdminCourseStore = create<adminCourseSchema>()(set => ({
  isLoading: false,

  createError:null,
  deleteError:null,

  isCreated: false,
  isDeleted: false,

  addCourse: async (course, id) => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(`courses/${id}`, course, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ createError: null, isCreated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ createError: error, isCreated: false });
    } finally {
      set({ isLoading: false });

    }
  },

  deleteCourse: async id => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.delete(`courses/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ deleteError: null, isDeleted: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ deleteError: error, isDeleted: false });
    } finally {
      set({ isLoading: false });

    }
  },
}));
