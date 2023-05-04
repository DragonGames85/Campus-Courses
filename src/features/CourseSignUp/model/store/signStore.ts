import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { signUpSchema } from "../types/signUpSchema";

export const useSignStore = create<signUpSchema>()(set => ({
  isLoading: false,
  error: null,

  signUp: async id => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Вы записались на курс");
    const notifyError = () => toast("Произошла ошибка при записи на курс");
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
