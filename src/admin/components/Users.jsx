import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../services/AdminService";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    AdminService.getUsers().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  const columns = [
    {
      name: "Nom",
      selector: "name",
      sortable: true,
    },
    {
      name: "Addresse",
      selector: "adresse",
      sortable: true,
    },
    {
      name: "Telephone",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Nb Commandes",
      selector: "orders",
      format: (row) => row.orders.length,
      sortable: true,
    },
    {
      name: "Consulter",
      button: true,
      cell: (row) => (
        <Link
          to={ "/admin/users/" + row._id }
          eventkey={2}
          className="btn btn-primary text-white px-4"
        >
          <FontAwesomeIcon icon={faMoneyCheck} />
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Container>
        {isLoading ? (
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
        ) : (
          <DataTable
            title="Clients"
            columns={columns}
            data={data}
            defaultSortField="title"
            pagination
          />
        )}
      </Container>
    </div>
  );
}
