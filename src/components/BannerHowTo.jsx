import React from "react";
import { Container } from "react-bootstrap";
import DeliveryIcon from "../assets/icons/delivery.svg";
import CopyrightIcon from "../assets/icons/copyright.svg";
import MarkerIcon from "../assets/icons/marker.svg";

export default function BannerHowTo() {
  return (
    <Container className="mt-5" fluid>
      <h1 className="text-center howToText pb-4">Comment ca marche ?</h1>

      <div className="row text-center padding">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <img className="logo-small my-3" alt="" src={CopyrightIcon} />
          <h3 className="">Choisissez votre produits</h3>
          <p>Saisissez votre liste d'épicerie de toute catégories, vous pouvez méme limiter le prix d'un produit ou toute la commande.</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4">
          <img className="logo-small my-3" alt="" src={MarkerIcon} />
          <h3 className="">Saisissez votre adresse</h3>
          <p>Renseignez l'adresse où vous souhaitez être livré</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4">
          <img className="logo-small my-3" alt="" src={DeliveryIcon} />
          <h3 className="">Recevez-le à votre porte</h3>
          <p>Votre commande vous sera livrée en un rien de temps</p>
        </div>
        
      </div>
    </Container>
  );
}
