import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function SpinnerLoad() {
    return (
        <Container className="d-flex justify-content-center align-items-center loaderDiv" fluid>
              <Spinner animation="grow" variant="warning" className="spin" style={{width: "5rem", height:"5rem" }}/>
        </Container>
    )
}
