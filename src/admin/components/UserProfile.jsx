import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Col,
  Row,
  Accordion,
  Button,
  Badge,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../services/AdminService";
import moment from "moment";

export default function UserProfile(props) {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    adresse: "",
    email: "",
    orders: [],
  });

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

    return (
      <Badge variant={variant} className="p-2 float-right">
        {state}
      </Badge>
    );
  };

  useEffect(() => {
    AdminService.getProfile(id).then((data) => {
      console.log(data);
      setUser({ ...data.user, ...data });
    });
  }, [id]);

  return (
    <Container className="w-75 mt-4 mx-auto">
      <Button variant="light" className="mb-3 text-uppercase" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </Button>
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon icon={faUser} size="4x" />
        </Card.Header>
        <Card.Body>
          <Container className="rounded mb-4" fluid>
            <p className="font-weight-bold text-center text-warning">
              Information personnel
            </p>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Nom :
              </Col>
              <Col md="9">{user.name}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Telephone :
              </Col>
              <Col md="9">{user.phone}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                Adresse :
              </Col>
              <Col md="9">{user.adresse}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="3" className="font-weight-bold">
                email :
              </Col>
              <Col md="9">{user.email}</Col>
            </Row>
            <p className="font-weight-bold text-center text-warning">
              Mes commandes
            </p>
            <Accordion>
              {user.orders.map((order, idx) => {
                return (
                  <Card key={order._id}>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={idx}
                      >
                        Commande #{idx + 1}
                      </Accordion.Toggle>
                      {stateBadge(order.state)}
                    </Card.Header>
                    <Accordion.Collapse eventKey={idx}>
                      <Card.Body>
                        <p className="text-muted">
                          {moment(order.date).format("DD-MM-YY HH:MM")}
                        </p>
                        <Row>
                          <Col md="2">
                            <p className="font-weight-bold text-nowrap">QTE</p>
                          </Col>
                          <Col md="8">
                            <p className="font-weight-bold text-nowrap">
                              Produit
                            </p>
                          </Col>
                          <Col md="2">
                            <p className="font-weight-bold text-nowrap">
                              Prix max
                            </p>
                          </Col>
                        </Row>
                        {order.items.map((item, index) => {
                          return (
                            <Row className="mb-2">
                              <Col md="2">{item.quantity}</Col>
                              <Col md="8">{item.item}</Col>
                              <Col md="2">{item.prixMax || "Non"}</Col>
                            </Row>
                          );
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
