import { useProfileStore } from "@src/entities/Profile";
import { useAuthStore } from "@src/features/AuthByEmail";
import { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { IoEnter } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

export const AppNavbar = () => {
  const { isAuth, logoutUser } = useAuthStore();
  const { profile, getProfile, error } = useProfileStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.response?.status == 401) logoutUser(navigate);
    else if (isAuth) getProfile();
  }, [error, isAuth]);

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Brand className="ms-3" as={Link} to="/">
        Кампусные курсы
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isAuth ? (
          <>
            <Nav>
              <Nav.Link as={Link} to="/groups">
                <HiUserGroup className="me-1" />
                Группы курсов
              </Nav.Link>
              {profile?.roles.isStudent && (
                <Nav.Link as={Link} to="/courses/my/">
                  <BsFillBellFill className="me-1" />
                  Мои курсы
                </Nav.Link>
              )}
              {profile?.roles.isTeacher && (
                <Nav.Link as={Link} to="/courses/teaching/">
                  <GiTeacher className="me-1" />
                  Преподаваемые курсы
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto me-3">
              <Nav.Link as={Link} to="/profile">
                <CgProfile className="me-1" />
                {profile?.email}
              </Nav.Link>
              <Nav.Link onClick={() => logoutUser(navigate)}>
                <FiLogOut className="me-1" />
                Выйти
              </Nav.Link>
            </Nav>
          </>
        ) : (
          <Nav className="ms-auto me-3">
            <Nav.Link as={Link} to="/register">
              <ImProfile className="me-1" />
              Регистрация
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <IoEnter className="me-1" />
              Вход
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
