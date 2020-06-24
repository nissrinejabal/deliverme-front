import React, { useContext, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { MainFormContext } from "../context/MainFormContext";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
  const [state, setState] = useContext(MainFormContext);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const isEmptyCheck = user.email !== "" && user.password !== "";

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.login(user).then((data) => {
      console.log(data);
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        setState({
          ...state,
          name: user.name,
          phone: user.phone,
          adresse: user.adresse,
        });
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else {
        setMessage("Votre email ou mot de passe est incorrect.");
        setIsLoading(false);
      }
    });
  };

  return (
    <Container>
      {message ? (
        <Alert variant="danger" className="text-center">
          Votre identifiant ou mot de passe est incorrect.
        </Alert>
      ) : null}
        <p className="text-center w-50 m-auto loginTxt">Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
      <Container className="w-50 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput" className="inputLabel">
              Email :
            </label>
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="name@example.com"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password" className="inputLabel">
              Mot de passe :
            </label>
            <input
              name="password"
              onChange={onChange}
              type="password"
              placeholder="********"
              className="form-control"
            />
          </div>
          <Button
            variant="warning"
            type="submit"
            size="md"
            className="mx-auto rounded-pill text-white font-weight-bold"
            block
            disabled={!isEmptyCheck}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Se Connecter"
            )}
          </Button>
          <Container className="text-center pt-3">
            <Link to="/signup" className="text-dark font-weight-bold text-decoration-none text-uppercase">Créer un compte</Link>
          </Container>
        </form>
      </Container>
    </Container>
  );
}
