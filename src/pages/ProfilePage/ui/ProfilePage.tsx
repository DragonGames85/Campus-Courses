import { memo, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuthStore } from "@src/features/AuthByEmail";
import { ProfileCard, useProfileStore } from "@src/entities/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const notifySuccess = () => toast("Профиль успешно изменен");
  const notifyError = () =>
    toast("Произошла ошибка при редактировании профиля");

  const { success, error, isLoading, profile, putProfile, getProfile } =
    useProfileStore();

  const { logoutUser } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (success) {
      notifySuccess();
      useProfileStore.setState({ success: false, error: null });
      getProfile();
    }
    if (error) {
      notifyError();
      useProfileStore.setState({ success: false, error: null });
    }
  }, [success, error]);

  const navigate = useNavigate();
  if (error?.response?.status == 401) logoutUser(navigate);

  return (
    <Container className="p-5 text-white">
      <h2>Профиль</h2>
      <ProfileCard
        isLoading={isLoading}
        profile={profile}
        putProfile={putProfile}
        error={error}
      />
    </Container>
  );
};

export default memo(ProfilePage);
