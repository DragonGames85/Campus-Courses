import axios from "axios";
import { create } from "zustand";
import { requestSchema } from "../types/requestSchema";
import { toast } from "react-toastify";

export const useRequestStore = create<requestSchema>()(set => ({
  isLoading: false,
  error: null,

  setStudentStatus: async (courseId, studentId, status) => {
    set({ isLoading: true });
    const notifySuccess = () =>
      toast(
        status === "Declined"
          ? "Заявка студента отклонена"
          : "Студент принят на курс"
      );
    const notifyError = () =>
      toast(
        status === "Declined"
          ? "Произошла ошибка при отклонении заявки"
          : "Произошла ошибка при принятии студента"
      );
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        `courses/${courseId}/student-status/${studentId}`,
        {
          status,
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

  setStudentMarks: async (courseId, studentId, markType, mark) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Оценка успешно добавлена");
    const notifyError = () => toast("Произошла ошибка при добавлении оценки");
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        `courses/${courseId}/marks/${studentId}`,
        {
          markType,
          mark,
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
