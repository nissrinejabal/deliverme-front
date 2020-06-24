import React, { useEffect, useState } from "react";
import { Container, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import AdminService from '../../services/AdminService';
import moment from 'moment';



export default function Orders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    AdminService.getOrders().then((res) => {
      console.log("res", res);
      setData(res);
      setIsLoading(false);
    });
  }, []);

  const columns = [
    {
      name: "date",
      selector: (row) => moment(row.date).format('DD/MM/YY HH:MM'),
      sortable: true,
    },
    {
      name: "Nom Client",
      selector: "name",
      sortable: true,
    },
    {
      name: "Adresse",
      selector: "adresse",
      sortable: true,
    },
    {
      name: "Etat",
      selector: row => stateBadge(row.state),
      sortable: true,
    },
    {
      name: "Consulter",
      button: true,
      cell: (row) => (
        <Link className="btn-show" to={ "/admin/orders/" + row._id }>
          <FontAwesomeIcon icon={faMoneyCheck} />
        </Link>
      ),
    },
  ];

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
    <div>
      <Container>
        <DataTable
          title="Commandes"
          columns={columns}
          data={data}
          pagination
        />
      </Container>
    </div>
  );
}
