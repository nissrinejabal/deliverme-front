import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge, Spinner } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCartArrowDown,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import StatsCard from "./StatsCard";
import OrderModal from "./OrderModal";
import AdminService from "../../services/AdminService";

export default function Dashboard(props) {
  const [show, setShow] = useState(false);
  const [dataModal, setdataModal] = useState(null);
  const [data, setData] = useState({
    usersCount: 0,
    ordersCount: 0,
    orders: [],
  });
  const { usersCount, ordersCount, orders } = data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AdminService.getData().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  const updateState = (idx, state) => {
    const ordersUpdated = data.orders;
    ordersUpdated[idx].state = state;
    setdataModal({ ...dataModal, state });
    setData({ ...data, orders: ordersUpdated });
  };

  const stateBadge = (state) => {
    let variant;
    switch (state) {
      case "Nouveau":
        variant = "info";
        break;
      case "Acceptée":
        variant = "warning";
        break;
      case "Annulée":
        variant = "danger";
        break;
      case "Ignorée":
        variant = "danger";
        break;
      case "Livrée":
        variant = "success";
        break;
      default:
        variant = "danger";
        break;
    }

    return (
      <Badge variant={variant} className="p-2">
        {state}
      </Badge>
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = (item, idx) => {
    setdataModal({ ...item, idx });
    setShow(true);
  };

  if (isLoading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center loaderDiv"
        fluid
      >
        <Spinner
          animation="grow"
          variant="warning"
          className="spin"
          style={{ width: "5rem", height: "5rem" }}
        />
      </Container>
    );

  return (
    <Container>
      {dataModal ? (
        <OrderModal
          show={show}
          data={dataModal}
          handleClose={handleClose}
          updateState={updateState}
        />
      ) : (
        ""
      )}

      <h3 className="stats-text my-3">Statistiques :</h3>
      <Row>
        <Col xs="4">
          <StatsCard
            icon={faCartArrowDown}
            title="Commandes"
            count={ordersCount}
          />
        </Col>
        <Col xs="4">
          <StatsCard icon={faUsers} title="Clients" count={usersCount} />
        </Col>
      </Row>
      <h3 className="stats-text my-3">Commandes :</h3>
      <Container className="p-4">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Heure</th>
              <th>Nom client</th>
              <th>Adresse</th>
              <th>Etat</th>
              <th>Consulter</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, idx) => {
              var time = new Date(item.date);
              time = moment(time).format("HH:mm");
              return (
                <tr key={idx}>
                  <td>{time}</td>
                  <td>{item.name}</td>
                  <td>{item.adresse}</td>
                  <td>{stateBadge(item.state)}</td>
                  <td>
                    <button
                      className="btn-show"
                      onClick={() => handleShow(item, idx)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}
