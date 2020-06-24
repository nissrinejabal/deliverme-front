import React from "react";
import { Modal, Row, Col, Container, Dropdown, Badge } from "react-bootstrap";
import moment from 'moment';
import AcceptIgnoreBtns from "./AcceptIgnoreBtns";
import ShippedDeclineBtns from "./ShippedDeclineBtns";

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

  return <Badge variant={variant} >{ state }</Badge>
}

export default function OrderModal(props) {
  const { data } = props;

  const decideBtns = () => {
    if (data.state === "Nouveau") return <AcceptIgnoreBtns updateState={props.updateState} idx={data.idx} _id={data._id} /> 
    if (data.state === "Acceptée") return <ShippedDeclineBtns updateState={props.updateState} idx={data.idx} _id={data._id} /> 
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={true}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Commande Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="rounded mb-4" fluid>
          <p className="font-weight-bold text-center text-warning">
            Information personnel
          </p>
          <Row className="mb-3">
            <Col md="3" className="font-weight-bold">
              Nom :
            </Col>
            <Col md="3">{data.name}</Col>
            <Col md="3" className="font-weight-bold text-center">
              Date :
            </Col>
            <Col md="3">{moment(data.date).format('YYYY-MM-DD HH:mm')}</Col>
          </Row>
          <Row className="mb-3">
            <Col md="3" className="font-weight-bold">
              Telephone :
            </Col>
            <Col md="3">{data.phone}</Col>
            <Col md="3" className="font-weight-bold text-center">
              Etat :
            </Col>
            <Col md="3">{stateBadge(data.state)}</Col>
          </Row>
          <Row className="mb-3">
            <Col md="3" className="font-weight-bold">
              Adresse :
            </Col>
            <Col md="9">{data.adresse}</Col>
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
          {data.items.map((item, idx) => {
            return (
              <Row key={ item._id } className="mb-2">
                <Col md="2">{ item.quantity }</Col>
                <Col md="8">{ item.item }</Col>
                <Col md="2">{ item.prixMax }</Col>
              </Row>
            );
          })}
          <Dropdown.Divider className="my-2" />
          <Row className="pt-3 d-flex align-items-center">
            <Col md="9" className="font-weight-bold ">
              Prix max de la commande :
            </Col>
            <Col md="3" className="text-center">
              { data.prixMax }
            </Col>
            <Col md="3" className="font-weight-bold mt-2">
              Note :
            </Col>
            <Col md="9" className="mt-2">
              { data.note }
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="text-center">
        { decideBtns() }
      </Modal.Footer>
    </Modal>
  );
}
