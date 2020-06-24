import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StatsCard(props) {
    return (
        <Row className="m-3 p-2 stats-card">
            <Col xs="4" className="d-flex flex-column justify-content-center">
                <FontAwesomeIcon icon={props.icon} size="3x" className="stats-icon"/>
            </Col>
            <Col xs="8">
                <Container className="d-flex flex-column justify-content-between stats-text p-0">
                    <h3 className="font-weight-bold text-warning">{ props.count }</h3>
                    <h5>{props.title}</h5>
                </Container>
            </Col>
        </Row>
    )
}
