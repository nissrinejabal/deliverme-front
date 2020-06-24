import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "bs-stepper/dist/css/bs-stepper.min.css";
import Stepper from "bs-stepper";
import { AuthContext } from '../context/AuthContext';
import ItemsForm from "./ItemsForm";
import InfosForm from "./InfosForm";
import OrderConfirmation from "./OrderConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMapMarkerAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";


export class OrderForm extends Component {
  static contextType = AuthContext;
  
  constructor() {
    super();
    this.state = {
      items: [],
      name: "",
      adress: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }

  nextStep = () => {
    const { isAuthenticated } = this.context;
    if(!isAuthenticated) this.props.history.push('/login');
    this.stepper.next();
  };

  prevStep = () => {
    this.stepper.previous();
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    
    return (
      <Col xs="12" md="6" className="mainForm mx-auto">
        <div id="stepper1" className="bs-stepper">
          <Card className="shadow-lg">
            <Card.Header className="bs-stepper-header bg-white">
              <div className="step" data-target="#itemsForm">
                <button className="step-trigger">
                  <span className="bs-stepper-circle"><FontAwesomeIcon icon={faList} /></span>
                  <span className="bs-stepper-label">Commande</span>
                </button>
              </div>
              <div className="line"></div>
              <div className="step" data-target="#infosForm"> 
                <button className="step-trigger">
                  <span className="bs-stepper-circle"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                  <span className="bs-stepper-label">Infos</span>
                </button>
              </div>
              <div className="line"></div>
              <div className="step" data-target="#orderConfirmation">
                <button className="step-trigger">
                  <span className="bs-stepper-circle"><FontAwesomeIcon icon={faCheck} /></span>
                  <span className="bs-stepper-label">Validation</span>
                </button>
              </div>
            </Card.Header>
            <Card.Body className="bs-stepper-content py-4">
              <form onSubmit={this.onSubmit}>
                <ItemsForm nextStep={this.nextStep}/>
                <div className="content" id="infosForm">
                  <InfosForm nextStep={this.nextStep} prevStep={this.prevStep}/>
                </div>
                <OrderConfirmation prevStep={this.prevStep}/>
              </form>
            </Card.Body>
          </Card>
          <div className="bs-stepper-content"></div>
        </div>
      </Col>
    );
  }
}

export default OrderForm;
