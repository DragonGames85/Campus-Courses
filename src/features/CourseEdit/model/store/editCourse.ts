import axios from "axios";
import { create } from "zustand";
import { editCourseSchema } from "../types/editCourseSchema";

export const useEditCourseStore = create<editCourseSchema>()(set => ({
  isLoading: false,

  statusError: null,
  infoError: null,
  notificationError: null,

  isStatusUpdated: false,
  isInfoUpdated: false,
  isNotificationCreated: false,

  createNotification: async (id, notification) => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(`courses/${id}/notifications`, notification, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      set({ notificationError: null, isNotificationCreated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ notificationError: error, isNotificationCreated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setCourseStatus: async (id: string, status: string) => {
    set({ isLoading: true });
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
      set({ statusError: null, isInfoUpdated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ statusError: error, isInfoUpdated: false });
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
      set({ infoError: null, isInfoUpdated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ infoError: error, isInfoUpdated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
