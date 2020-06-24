import React, { useContext, useState } from "react";
import { Container, Dropdown, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { MainFormContext } from "../context/MainFormContext";
import OrdersService from "../services/OrdersService";
import SpinnerLoad from "./SpinnerLoad";

export default function OrderConfirmation(props) {
  const { user } = useContext(AuthContext);
  const [state, setState] = useContext(MainFormContext);
  const { prixMax } = state;
  const [isClicked, setisClicked] = useState(false);
  const [submit, setSubmit] = useState({ isLoading: false, isSubmited: false, error: false });
  const { items } = state;

  const onChange = (e) => {
    setState({ ...state, prixMax: e.target.value });
  };

  const onClick = () => {
    setisClicked(true);
  };

  const submitOrder = (e) => {
    const { name, phone, adresse, note } = user;
    const order = { ...state, name, phone, adresse, note };
    e.preventDefault();
    setSubmit({ isSubmited: false, isLoading: true });
    OrdersService.postOrder(order).then((data) => {
      const { msgError } = data;
      if (msgError) {
        setSubmit({ isSubmited: false, isLoading: false, error: true });
      } else {
        setSubmit({ isSubmited: true });
      }
    });
  };

  const condtionalRender = () => {
    if (isClicked)
      return (
        <Form.Control
          type="text"
          placeholder="100 DH"
          value={prixMax || ""}
          name="prixMax"
          onChange={onChange}
        />
      );
    return (
      <Button variant="success" block onClick={onClick}>
        <FontAwesomeIcon icon={faLock} />
      </Button>
    );
  };

  const isLoadingRender = () => {
    if (submit.isSubmited) {
      return (
        <Container id="orderConfirmation" className="text-center">
          <FontAwesomeIcon icon={faCheck} size="6x" className="check my-4"/>
          <h3 className="text-success py-3">Votre commande a bien été placée.</h3>
          <p>Votre commande est acceptée et sera traitée dans les meilleurs délais <br />
            Merci de reprendre contact avec nous si vous pensez qu'il s'agit d'une erreur.
            Nous vous remercions pour votre compréhension.       </p>
        </Container>
      );
    }
  
    if (submit.isLoading) {
      return (
          <SpinnerLoad />
      );
    }
  }

  if (submit.isLoading || submit.isSubmited) {
    return (
      <Container id="orderConfirmation" className="content">
        { isLoadingRender() }
      </Container>
    );
  }

  return (
    <Container id="orderConfirmation" className="content">
      {submit.error ? (
        <Alert variant="danger" className="text-center">
          Une erreur système s'est produite, veuillez réessayer, ou contacter l'administrateur. 
        </Alert>
      ) : null}
      <Container className="rounded mb-4 p-0" fluid>
        <p className="font-weight-bold text-center text-warning">
          Information personnel
        </p>
        <Row className="mb-3">
          <Col xs="6" md="3" className="font-weight-bold">
            Nom :
          </Col>
          <Col xs="6" md="9">{user.name}</Col>
        </Row>
        <Row className="mb-3">
          <Col xs="6" md="3" className="font-weight-bold">
            Telephone :
          </Col>
          <Col xs="6" md="9">{user.phone}</Col>
        </Row>
        <Row className="mb-3">
          <Col xs="6" md="3" className="font-weight-bold">
            Adresse :
          </Col>
          <Col xs="6" md="9">{user.adresse}</Col>
        </Row>
        <Dropdown.Divider className="my-2" />
        <p className="font-weight-bold text-center text-warning">Details</p>
        <Row>
          <Col xs="3" md="2">
            <p className="font-weight-bold text-nowrap">QTE</p>
          </Col>
          <Col xs="6" md="8">
            <p className="font-weight-bold text-nowrap">Produit</p>
          </Col>
          <Col xs="3" md="2">
            <p className="font-weight-bold text-nowrap">Prix max</p>
          </Col>
        </Row>
        {items.map((item, idx) => {
          return (
            <Row key={idx} className="mb-2 py-0">
              <Col xs="3" md="2">{item.quantity}</Col>
              <Col xs="6" md="8">{item.item}</Col>
              <Col xs="3" md="2">{item.prixMax ? item.prixMax : "Non"}</Col>
            </Row>
          );
        })}
        <Dropdown.Divider className="my-2" />
        <Row className="pt-3 d-flex align-items-center">
          <Col xs="9" className="font-weight-bold ">
            Le prix de la livraison :
          </Col>
          <Col xs="3" className="text-center">
            20 DH
          </Col>
        </Row>
        <Row className="pt-3 d-flex align-items-center">
          <Col xs="9">
            <p className="font-weight-bold m-0">
              Limiter le prix de toute la commande{" "}
              <span className="text-muted font-weight-normal">(Optionnel)</span>{" "}
              :{" "}
            </p>
          </Col>
          <Col xs="3">{condtionalRender()}</Col>
        </Row>
      </Container>
      <Form.Row className="mt-4">
        <Col xs="3">
          <Button
            variant="secondary"
            size="lg"
            className="mx-auto rounded-pill font-weight-bold"
            block
            onClick={() => props.prevStep()}
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            <span className="btnsText">Retour</span>
          </Button>
        </Col>
        <Col xs="9">
          <Button
            variant="warning"
            size="lg"
            className="mx-auto rounded-pill font-weight-bold text-white"
            onClick={submitOrder}
            block
          >
            Confirmer <span className="btnsText">ma commande</span>
          </Button>
        </Col>
      </Form.Row>
    </Container>
  );
}
