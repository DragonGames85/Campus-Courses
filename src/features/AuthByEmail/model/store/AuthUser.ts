import axios from "axios";
import { create } from "zustand";
import { AuthSchema } from "../types/AuthSchema";
import { toast } from "react-toastify";

export const useAuthStore = create<AuthSchema>()(set => ({
  isAuth: !!localStorage.getItem("jwt"),
  error: null,
  isLoading: false,

  registerUser: async (
    fullName,
    birthDate,
    email,
    password,
    confirmPassword,
    navigate,
    showErrors
  ) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Вы успешно зарегистрировались");
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
      set({ isAuth: true, error: null });
      navigate("/");
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error, isAuth: false });
      showErrors(true);
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (email, password, navigate, showErrors) => {
    set({ isLoading: true });
    const notifySuccess = () => toast("Вход выполнен");
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

      set({ isAuth: true, error: null });
      navigate("/");
      notifySuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error, isAuth: false });
      showErrors(true);
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async navigate => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("profile");
    navigate("/");
    set({ isAuth: false, error: null });
  },
}));
