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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList } from "@fortawesome/free-solid-svg-icons";
import OrdersService from "../services/OrdersService";
import moment from "moment";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    adresse: "",
    email: "",
    orders: [],
  });

  const stateBadge = (state) => {
    let variant;
    switch(state){
      case 'Nouveau' : variant = 'info'; break;
      case 'Acceptée' : variant = 'warning'; break;
      case 'Annulée' : variant = 'danger'; break;
      case 'Ignorée' : variant = 'danger'; break;
      case 'Livrée' : variant = 'success'; break;
      default : variant = 'danger' ; break;
    }

    return <Badge variant={variant} className="p-2 float-right" >{ state }</Badge>
  }

  useEffect(() => {
    OrdersService.getData().then((data) => {
      setUser({ ...data.user, ...data });
    });
  }, []);

  return (
    <Card className="w-50 mx-auto loginCard shadow-lg">
      <Card.Header className="text-center bg-white border-0">
        <h1>Profile</h1>
      </Card.Header>
      <Card.Body>
        <Container className="rounded mb-4" fluid>
          <p className="font-weight-bold text-center text-warning">
            <FontAwesomeIcon icon={faUser} className="mr-3 text-dark"/> Information personnel
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
          <FontAwesomeIcon icon={faList} className="mr-3 text-dark"/>Mes commandes
          </p>
          <Accordion>
            {user.orders.map((order, idx) => {
              return (
                <Card key={order._id}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
                      Commande #{idx + 1}
                    </Accordion.Toggle>
                    { stateBadge(order.state) }
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
  );
}
