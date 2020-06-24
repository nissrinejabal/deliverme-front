import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AdminPage from "./admin/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
