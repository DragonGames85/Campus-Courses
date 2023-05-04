import axios from "axios";
import { create } from "zustand";
import { editCourseSchema } from "../types/editCourseSchema";
import { toast } from "react-toastify";

export const useEditCourseStore = create<editCourseSchema>()(set => ({
  error: null,
  isLoading: false,

  addTeacher: async (id: string, userId: string) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Учитель успешно добавлен");
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
        set({ error: null });
        notifySuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error });
        setTimeout(() => {
          set({ error: null });
        }, 5000);
      }
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createNotification: async (id, notification) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Уведомление успешно создано");
    const notifyError = () =>
      toast("Произошла ошибка при создании уведомления");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(`courses/${id}/notifications`, notification, {
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

  setCourseStatus: async (id: string, status: string) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Статус курса изменен");
    const notifyError = () => toast("Произошла ошибка при изменении статуса");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        `courses/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
    }
  },

  editCourseInfo: async (
    id: string,
    requirements: string,
    annotations: string
  ) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Информация о курсе изменена");
    const notifyError = () =>
      toast("Произошла ошибка при редактировании курса");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.put(
        `courses/${id}`,
        {
          requirements,
          annotations,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
    }
  },
}));
