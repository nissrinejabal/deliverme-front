import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Form, Col, Button, Spinner, Alert } from "react-bootstrap";

export default function SignUpForm(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    adresse: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ name: "", email: "", password: "", phone: "", adresse: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.register(user).then((data) => {
      if (!data.msgError) {
        resetForm();
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      } else {
        setMessage(data.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      {message ? (
        <Alert variant="danger" className="text-center">
          <p>{ message }</p>
        </Alert>
      ) : null}

      <Form.Row>
        <Form.Group as={Col} controlId="signupName">
          <Form.Label>Nom Complet<span className="text-danger">*</span> :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            name="name"
            onChange={onChange}
            value={user.name}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="signupPhone">
          <Form.Label>Telephone<span className="text-danger">*</span> :</Form.Label>
          <Form.Control
            type="tel"
            placeholder="06 XX XX XX XX"
            name="phone"
            onChange={onChange}
            value={user.phone}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="signupEmail">
          <Form.Label>Email<span className="text-danger">*</span> :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email@example.com"
            name="email"
            onChange={onChange}
            value={user.email}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="signupPassword">
          <Form.Label>Mot de passe<span className="text-danger">*</span> :</Form.Label>
          <Form.Control
            type="password"
            placeholder="*******"
            name="password"
            onChange={onChange}
            value={user.password}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="signupAddress">
        <Form.Label>Address<span className="text-danger">*</span> :</Form.Label>
        <Form.Control
          placeholder="Quartier, Rue, Emmeuble, App N°"
          name="adresse"
          onChange={onChange}
          value={user.adresse}
        />
      </Form.Group>

      <Button
        type="submit"
        variant="warning"
        size="lg"
        className="w-50 mx-auto rounded-pill font-weight-bold text-white mt-4"
        block
      >
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Créer mon compte"
        )}
      </Button>
    </Form>
  );
}
