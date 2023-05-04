import axios from "axios";
import { create } from "zustand";
import { adminGroupSchema } from "../types/adminGroupSchema";
import { toast } from "react-toastify";

export const useAdminGroupStore = create<adminGroupSchema>()(set => ({
  isLoading: false,
  error: null,

  updateGroup: async (id, name) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Группа успешно изменена");
    const notifyError = () =>
      toast("Произошла ошибка при редактировании группы");
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
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
    }
  },

  addGroup: async name => {
    const notifySuccess = () => toast("Группа успешно добавлена");
    const notifyError = () => toast("Произошла ошибка при добавлении группы");
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
      set({ error: null });
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
      notifyError();
    } finally {
      set({ isLoading: false });
    }
  },

  deleteGroup: async id => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Группа успешно удалена");
    const notifyError = () => toast("Произошла ошибка при удалении группы");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.delete(`groups/${id}`, {
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
}));
