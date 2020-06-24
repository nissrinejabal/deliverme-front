import React, { useContext, useState } from "react";
import validator from 'validator';
import { Container, Button, Form, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";



export default function InfosForm(props) {
  const  { user, setUser } = useContext(AuthContext);
  const { name, phone, adresse, note } = user;
  const [valid, setValid] = useState({ validName: true, validPhone: true, validAdresse: true});
  let { validName, validPhone, validAdresse} = valid;

  const checkInputs = () => {
    validName = !validator.isEmpty(name || '');
    validPhone = validator.isMobilePhone(phone || '');
    validAdresse = !validator.isEmpty(adresse || '');

    if(validName && validPhone && validAdresse){
      setValid({validName, validPhone, validAdresse})
      props.nextStep();
    }
    else setValid({validName, validPhone, validAdresse});
  }
  
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
        <Form.Row>
          <Form.Group as={Col} xs="6" controlId="infoName">
            <Form.Label>Nom Complet<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Nom" value={name || ''} name="name" onChange={onChange} isInvalid={!validName}/>
            <Form.Control.Feedback type="invalid">Le nom est obligatoire !</Form.Control.Feedback>
          </Form.Group>

          
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs="6" controlId="infoPassword">
            <Form.Label>Telephone<span className="text-danger">*</span></Form.Label>
            <Form.Control type="tel" placeholder="06 XX XX XX XX" value={phone || ''} name="phone" onChange={onChange} isInvalid={!validPhone}/>
            <Form.Control.Feedback type="invalid">Vous devez ajouter un numéro valable !</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="infoAddress">
          <Form.Label>Addresse<span className="text-danger">*</span></Form.Label>
          <Form.Control placeholder="Quartier, Rue, Emmeuble, App N°" value={adresse || ''} name="adresse" onChange={onChange} isInvalid={!validAdresse}/>
          <Form.Control.Feedback type="invalid">L'Adresse est obligatoire !</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="infoNote">
          <Form.Label>Note :</Form.Label>
          <Form.Control as="textarea" rows="5" value={note || ''} name="note" onChange={onChange}/>
        </Form.Group>

        <Form.Row>
          <Col xs="3">
          <Button
              variant="secondary"
              size="lg"
              className="mx-auto rounded-pill font-weight-bold"
              block
              onClick={() => props.prevStep()}
            >
              <FontAwesomeIcon className='mr-2' icon={faArrowLeft}/><span className="btnsText">Retour</span>
            </Button>
          </Col>
          <Col xs="9">
            <Button
              variant="warning"
              size="lg"
              className="mx-auto rounded-pill font-weight-bold btnsText text-white"
              block
              onClick={checkInputs}
            >
              Confirmer <span className="btnsText">ma commande</span>
            </Button>
          </Col>
        </Form.Row>
    </Container>
  );
}
