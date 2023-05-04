import axios from "axios";
import { create } from "zustand";
import { adminCourseSchema } from "../types/adminCourseSchema";
import { toast } from "react-toastify";

export const useAdminCourseStore = create<adminCourseSchema>()(set => ({
  isLoading: false,
  error: null,

  addCourse: async (course, id) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Курс успешно добавлен");
    const notifyError = () => toast("Произошла ошибка при добавлении курса");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(`courses/${id}`, course, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCourse: async id => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Курс успешно удален");
    const notifyError = () => toast("Произошла ошибка при удалении курса");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.delete(`courses/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
      window.history.go(-1);
    }
  },
}));
