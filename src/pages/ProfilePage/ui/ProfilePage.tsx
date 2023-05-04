import { memo, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuthStore } from "@src/features/AuthByEmail";
import { ProfileCard, useProfileStore } from "@src/entities/Profile";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { error, isLoading, profile, putProfile, getProfile } =
    useProfileStore();

  const { logoutUser } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  const navigate = useNavigate();
  if (error?.response?.status == 401) logoutUser(navigate);

  return (
    <Container className="p-5">
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
