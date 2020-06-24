import React, { useState, useContext } from "react";
import SideBar from "./components/SideBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import Orders from "./components/Orders";
import { AuthContext } from '../context/AuthContext';
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import OrderPage from "./components/OrderPage";

export default function AdminPage() {
  const [classN, setclassN] = useState("");
  const { isAuthenticated, user } = useContext(AuthContext);

  const toggle = () => {
    if (classN === "") setclassN("toggled");
    else setclassN("");
  };

  if(!isAuthenticated || user.role !== "admin") return <Redirect to="/" />
  return (
    <div className="wrapper">
      <div className={`sidebar ${classN}`}></div>
      <SideBar classN={classN} />
      <div className="content w-100">
        <Navbar toggle={toggle} />
        <Switch>
          <Route path="/admin/" exact component={Dashboard} />
          <Route path="/admin/orders" exact component={Orders} />
          <Route path="/admin/users" exact component={Users} />
          <Route path="/admin/users/:id" exact component={UserProfile} />
          <Route path="/admin/orders/:id" exact component={OrderPage} />
        </Switch>
      </div>
    </div>
  );
}
