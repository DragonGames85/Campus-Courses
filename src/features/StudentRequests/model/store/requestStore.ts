import axios from "axios";
import { create } from "zustand";
import { requestSchema } from "../types/requestSchema";

export const useRequestStore = create<requestSchema>()(set => ({
  isLoading: false,

  isStudentStatusUpdated: false,
  isStudentMarksUpdated: false,

  studentMarksError: null,
  studentStatusError: null,

  setStudentStatus: async (courseId, studentId, status) => {
    set({ isLoading: true });
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
      set({ studentStatusError: null, isStudentStatusUpdated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ studentStatusError: error, isStudentStatusUpdated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setStudentMarks: async (courseId, studentId, markType, mark) => {
    set({ isLoading: true });
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
      set({ studentMarksError: null, isStudentMarksUpdated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ studentMarksError: error, isStudentMarksUpdated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
