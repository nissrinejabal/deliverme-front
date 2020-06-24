import React, { useContext } from "react";
import { Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import authService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar(props) {
  const { setIsAuthenticated } = useContext(AuthContext);

  const logoutClick = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <Navbar className="bg-light d-flex justify-content-between">
      <Button onClick={props.toggle} variant="light">
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <div className="ml-auto">
        <Button variant="outline-danger" onClick={logoutClick}>
          <FontAwesomeIcon
            icon={faPowerOff}
          />
        </Button>
      </div>
    </Navbar>
  );
}
