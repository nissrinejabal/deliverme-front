import React from "react";
import { Row, Col } from 'react-bootstrap';

export default function InputsLabels() {
  return (
    <Row>
      <Col xs="6" className="text-left inputsLabels">
        <label>Produit<span className="text-danger">*</span></label>
      </Col>
      <Col xs="2" className="text-left inputsLabels">
        <label>Qte<span className="text-danger">*</span></label>
      </Col>
      <Col xs="4" className="text-left inputsLabels p-0">
        <label>Prix Max</label>
      </Col>
    </Row>
  );
}
