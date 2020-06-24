import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import WhatsappSVG from "../assets/icons/whatsapp.svg";
import FacebookSVG from "../assets/icons/facebook.svg";
import InstagramSVG from "../assets/icons/instagram.svg";
import MyLogoSVG from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
      
    <Container fluid className="footer mt-3 p-4">
      <Row>
        <Col xs={{span: 12, order: 2}} md={{span: 4, order: 1}} className="p-3">
          <p className="ml-4 pl-4">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-3" /> Maroc,
            Mohammedia.{" "}
          </p>
          <p className="ml-4 pl-4">
            <FontAwesomeIcon icon={faPhone} className="mr-3" /> 06 94 47 08 09{" "}
          </p>
          <p className="ml-4 pl-4">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3" />{" "}
            support@deliverme.com{" "}
          </p>
          <p className="ml-4 pl-4">
            <FontAwesomeIcon icon={faClock} className="mr-3" /> 7 jrs / 7 - 9:00
            / 23:00{" "}
          </p>
        </Col>
        <Col xs={{span: 12, order: 1}} md={{span: 4, order: 2}} className="d-flex justify-content-around align-items-center my-5">
            <img src={MyLogoSVG} alt="" height="100" />
        </Col>
        <Col xs={{span: 12, order: 3}} md={{span: 4, order: 3}}>
          <h3 className="text-center mt-5">Follow Us</h3>
          <Container className="h-50 d-flex justify-content-center align-items-center">
            <a href="#l">
              <img src={WhatsappSVG} className="social-icons m-4" alt="" />
            </a>
            <a href="#l">
              <img src={FacebookSVG} className="social-icons m-4" alt="" />
            </a>
            <a href="#l">
              <img src={InstagramSVG} className="social-icons m-4" alt="" />
            </a>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
