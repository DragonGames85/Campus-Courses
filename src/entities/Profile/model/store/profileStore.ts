import axios from "axios";
import { create } from "zustand";
import { profileSchema } from "../types/profileSchema";
import { useLocalProfile } from "@src/shared/lib/helpers/localProfile";

export const useProfileStore = create<profileSchema>()((set, get) => ({
  error: null,
  isLoading: false,
  profile: useLocalProfile(),
  success: false,

  getProfile: async () => {
    set({ isLoading: true,  });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const profileData = response.data;
      const response2 = await axios.get(`roles`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const rolesData = response2.data;
      set({
        profile: { ...profileData, roles: rolesData },
        error: null,
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...profileData, roles: rolesData })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  putProfile: async (fullName, birthDate) => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.put(
        `profile`,
        {
          fullName,
          birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      set({ error: null, success: true });
      get().getProfile();
    } catch (error) {
      if (axios.isAxiosError(error)) set({ error, success: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
