import axios from "axios";
import { create } from "zustand";
import { AuthSchema } from "../types/AuthSchema";

export const useAuthStore = create<AuthSchema>()(set => ({
  isAuth: !!localStorage.getItem("jwt"),
  isLoading: false,

  loginError: null,
  registerError: null,

  registerUser: async (
    fullName,
    birthDate,
    email,
    password,
    confirmPassword
  ) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "registration",
        {
          fullName,
          email,
          birthDate,
          password,
          confirmPassword,
        },
        {}
      );
      const jwt = response.data.token;
      localStorage.setItem("jwt", jwt);

      const response2 = await axios.get(`profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response3 = await axios.get(`roles`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...response2.data, roles: response3.data })
      );
      set({ isAuth: true, registerError: null });
    } catch (error) {
      if (axios.isAxiosError(error))
        set({ registerError: error, isAuth: false });
    } finally {
      set({ isLoading: false });
      setTimeout(() => set({ registerError: null }), 2000);
    }
  },

  loginUser: async (email, password) => {
    set({ isLoading: true });
    try {
      const response1 = await axios.post("login", {
        email,
        password,
      });
      const jwt = response1.data.token;
      localStorage.setItem("jwt", jwt);

      const response2 = await axios.get(`profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response3 = await axios.get(`roles`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...response2.data, roles: response3.data })
      );
      set({ loginError: null, isAuth: true });
    } catch (error) {
      if (axios.isAxiosError(error)) set({ loginError: error, isAuth: false });
    } finally {
      set({ isLoading: false });
      setTimeout(() => set({ loginError: null }), 2000);
    }
  },

  logoutUser: async navigate => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("profile");
    navigate("/");
    set({ isAuth: false });
  },
}));
