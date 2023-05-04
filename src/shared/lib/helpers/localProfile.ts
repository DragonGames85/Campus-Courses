import { profileState } from "@src/entities/Profile";

export const useLocalProfile = () => {
  const profileString = localStorage.getItem("profile");
  let profile: profileState | null = null;
  if (profileString) {
    try {
      profile = JSON.parse(profileString) as profileState;
    } catch (error) {
      return null;
    }
  }
  return profile;
};
