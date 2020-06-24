import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { MainFormProvider } from "../context/MainFormContext";
import SignUpPage from "./signupPage";
import Profile from "./Profile";
import OrderForm from "./OrderForm";
import BannerHowTo from "./BannerHowTo";
import Footer from "./Footer";
import CopyrightBanner from "./CopyrightBanner";
import Hero from './Hero';
import Navbar from './Navbar';
import LoginPage from "./LoginPage";


export default function Home() {
  return (
    <React.Fragment>
      <div className="hero">
        <Navbar />
        <Hero />
      </div>
      <Container fluid>
        <MainFormProvider>
            <Switch>
                <Route exact path="/" component={OrderForm} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignUpPage} />
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </MainFormProvider>
      </Container>
      <BannerHowTo />
      
      <Container fluid className="footerWave"></Container>
      <Footer />
      <CopyrightBanner />
    </React.Fragment>
  );
}
