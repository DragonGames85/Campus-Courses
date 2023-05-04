import { useEffect } from "react";
import { useUserListStore } from "../model/store/userListStore";

export const UserList = () => {
  const { users, getUsers, isLoading } = useUserListStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {isLoading && (
        <option key={"loading"} disabled>
          Загружаем...
        </option>
      )}
      {!isLoading &&
        users.map(user => (
          <option key={user.id} value={user.id}>
            {user.fullName}
          </option>
        ))}
    </>
  );
};
