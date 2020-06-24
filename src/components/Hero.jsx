import React from 'react';
import { Container } from 'react-bootstrap';
import ReactRotatingText from 'react-rotating-text';

export default function Hero() {

    return (
        <Container fluid>
            <h1 className="text-center mt-2 pacifcoTxt text-primary">Vous méritez une bonne livraison.</h1>
            <h3 className="text-center mt-1 pacifcoTxt">Faite vous livrer vos <ReactRotatingText items={['fruits', 'légumes', 'courses']} />.</h3>
        </Container>
    )
}
