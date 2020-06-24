import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import autService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/logo.png';

function Navba() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const logoutClick = () => {
    autService.logout();
    setIsAuthenticated(false);
  };

  const showAuthButtons = () => {
    return (
      <React.Fragment>
        <Link
          to="/signup"
          className="btn btn-outline-primary rounded-pill my-3 mx-2 px-3 font-weight-bold"
        >
          S'inscrire
        </Link>
        <Link
          to="/login"
          eventkey={2}
          className="btn btn-primary rounded-pill my-3 mx-2 px-3 text-white font-weight-bold"
        >
          Se connecter
        </Link>
      </React.Fragment>
    );
  };

  const showProfileButton = () => {
    return (
      <React.Fragment>
        <Link
          to="/profile"
          eventkey={2}
          className="btn btn-outline-primary text-primary rounded-pill m-3 px-4 text-white"
        >
          Profile
        </Link>
        <Link
          to="/"
          onClick={logoutClick}
          eventkey={2}
          className="btn btn-primary rounded-pill m-3 px-4 text-white"
        >
          Se deconnecter
          <FontAwesomeIcon className="ml-3" icon={faSignOutAlt} />
        </Link>
      </React.Fragment>
    );
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="light">
      <Navbar.Brand href="/" className="text-white">
        <img
          src={logo}
          className="d-inline-block align-top logo"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? showProfileButton() : showAuthButtons()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navba;
