import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Add from "./content/Add/Add";
import Header from "./content/Header/Header";

import "./Main.css";

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="full_main_page container">
        <div className="inner_main_page">
          <Header />
            <Switch>
              <Route path="/" exact={true} component={() => (<div />)} />
              <Route path="/login" component={Login} />
              <Route path="/add" component={Add} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Main;
