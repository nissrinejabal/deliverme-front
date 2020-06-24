import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Spinner,
  Card,
  Row,
  Col,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import AdminService from "../../services/AdminService";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function OrderPage() {
  let { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    AdminService.getOrder(id).then((order) => {
      setOrder(order.order);
      setIsLoading(false);
    });
  }, [id]);

  const stateBadge = (state) => {
    let variant;
    switch (state) {
      case "Nouveau":
        variant = "info";
        break;
      case "Acceptée":
        variant = "warning";
        break;
      case "Annulée":
        variant = "danger";
        break;
      case "Ignorée":
        variant = "danger";
        break;
      case "Livrée":
        variant = "success";
        break;
      default:
        variant = "danger";
        break;
    }

    return <Badge variant={variant}>{state}</Badge>;
  };

  const putState = (state, _id) => {
    AdminService.updateOrderState({ _id, state }).then((res) => {
      if (res.updated) setOrder({ ...order, state });
    });
  };

  const decideBtns = () => {
    if (order.state === "Nouveau")
      return (
        <Container className="d-flex justify-content-center">
          <Button
            variant="success"
            className="mx-3"
            onClick={() => putState("Acceptée", id)}
          >
            Accepter
          </Button>
          <Button
            variant="danger"
            className="mx-3"
            onClick={() => putState("Ignorée", id)}
          >
            Ignorer
          </Button>
        </Container>
      );
    if (order.state === "Acceptée")
      return (
        <Container className="d-flex justify-content-center">
          <Button
            variant="success"
            className="mx-3"
            onClick={() => putState("Livrée", id)}
          >
            Livrée
          </Button>
          <Button
            variant="danger"
            className="mx-3"
            onClick={() => putState("Annulée", id)}
          >
            Annuler
          </Button>
        </Container>
      );
  };

  if (isLoading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center loaderDiv"
        fluid
      >
        <Spinner
          animation="grow"
          variant="warning"
          className="spin"
          style={{ width: "5rem", height: "5rem" }}
        />
      </Container>
    );
  return (
    <Container className="py-4 w-75 mx-auto">
      <Button
        variant="light"
        className="mb-3 text-uppercase"
        onClick={() => history.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </Button>
      <Card>
        <Card.Header>Commande Details</Card.Header>
        <Card.Body>
          <Container className="rounded mb-4" fluid>
            <p className="font-weight-bold text-center text-warning">
              Information personnel
            </p>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Nom :
              </Col>
              <Col md="3">{order.name}</Col>
              <Col md="3" className="font-weight-bold text-center">
                Date :
              </Col>
              <Col md="3">{moment(order.date).format("YYYY-MM-DD HH:mm")}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Telephone :
              </Col>
              <Col md="3">{order.phone}</Col>
              <Col md="3" className="font-weight-bold text-center">
                Etat :
              </Col>
              <Col md="3">{stateBadge(order.state)}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Adresse :
              </Col>
              <Col md="9">{order.adresse}</Col>
            </Row>
            <Dropdown.Divider className="my-2" />
            <p className="font-weight-bold text-center text-warning">Details</p>
            <Row>
              <Col md="2">
                <p className="font-weight-bold text-nowrap">QTE</p>
              </Col>
              <Col md="8">
                <p className="font-weight-bold text-nowrap">Produit</p>
              </Col>
              <Col md="2">
                <p className="font-weight-bold text-nowrap">Prix max</p>
              </Col>
            </Row>
            {order.items.map((item, idx) => {
              return (
                <Row key={item._id} className="mb-2">
                  <Col md="2">{item.quantity}</Col>
                  <Col md="8">{item.item}</Col>
                  <Col md="2">{item.prixMax}</Col>
                </Row>
              );
            })}
            <Dropdown.Divider className="my-2" />
            <Row className="pt-3 d-flex align-items-center">
              <Col md="9" className="font-weight-bold ">
                Prix max de la commande :
              </Col>
              <Col md="3" className="text-center">
                {order.prixMax}
              </Col>
              <Col md="3" className="font-weight-bold mt-2">
                Note :
              </Col>
              <Col md="9" className="mt-2">{order.note}</Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>{decideBtns()}</Card.Footer>
      </Card>
    </Container>
  );
}
