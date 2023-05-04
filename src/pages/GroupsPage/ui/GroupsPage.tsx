import { GroupList, useGroupStore } from "@src/entities/Group";
import { useProfileStore } from "@src/entities/Profile";
import {
  CreateGroupModal,
  DeleteGroupModal,
  EditGroupModal,
} from "@src/features/Admin";
import { useAuthStore } from "@src/features/AuthByEmail";
import { memo, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const GroupsPage = () => {
  const { groups, isLoading, error, getGroups, success } = useGroupStore();

  const [createGroup, setCreateGroup] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);

  const [chosenID, setChosenID] = useState<string>("");
  const [chosenName, setChosenName] = useState<string>("");

  const { profile } = useProfileStore();
  const { logoutUser } = useAuthStore();

  const isAdmin = profile?.roles.isAdmin;

  const navigate = useNavigate();
  useEffect(() => {
    if (error?.response?.status == 401) {
      logoutUser(navigate);
    }
    getGroups();
  }, []);

  return (
    <Container>
      <h2>Группы кампусных курсов</h2>
      {isAdmin && !error && (
        <Button
          className="btn btn-primary mb-4 mt-3 d-flex align-items-center"
          onClick={() => setCreateGroup(true)}
        >
          <MdOutlineCreateNewFolder className="me-2" />
          Создать группу
        </Button>
      )}

      <CreateGroupModal
        reload={getGroups}
        show={createGroup}
        setShow={setCreateGroup}
      />

      <EditGroupModal
        show={editGroup}
        setShow={setEditGroup}
        chosenID={chosenID}
        chosenName={chosenName}
        reload={getGroups}
      />

      <DeleteGroupModal
        show={deleteGroup}
        setShow={setDeleteGroup}
        chosenID={chosenID}
        chosenName={chosenName}
        reload={getGroups}
      />

      <GroupList
        showEditModal={setEditGroup}
        showDeleteModal={setDeleteGroup}
        setChosenID={setChosenID}
        setChosenName={setChosenName}
        success={success}
        groups={groups}
        isLoading={isLoading}
        error={error}
        isAdmin={isAdmin}
      />
    </Container>
  );
};

export default memo(GroupsPage);
