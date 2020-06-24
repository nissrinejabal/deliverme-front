import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faStore, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function SideBar(props) {
  const { pathname } = useLocation();

  const decideCurrent = (idx) => {
    const twoRoutes = pathname === "/admin/" || pathname === "/admin"
    if( twoRoutes && idx === 1) return 'current'; 
    if(pathname.search("/admin/orders") !== -1 && idx === 2) return 'current'; 
    if(pathname.search("/admin/users") !== -1 && idx === 3) return 'current'; 
    return ''
  }

  return (
    <nav className={`fixed-top sidebar ${props.classN}`}>
      <Container className="sidebar-header py-4 text-center" >
        <h3>DeliverMe</h3>
      </Container>

      <ListGroup className="sidebar-menu">
        <Link to="/admin/" className="text-decoration-none"><ListGroup.Item className={decideCurrent(1)}><FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard</ListGroup.Item></Link>
        <Link to="/admin/orders" className="text-decoration-none"><ListGroup.Item className={decideCurrent(2)}><FontAwesomeIcon icon={faStore} className="mr-3" /> Commandes</ListGroup.Item></Link>
        <Link to="/admin/users" className="text-decoration-none"><ListGroup.Item className={decideCurrent(3)}><FontAwesomeIcon icon={faUsers} className="mr-3" /> Clients</ListGroup.Item></Link>
      </ListGroup>

      
    </nav>
  );
}
