import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Header from "./content/Header/Header";

import "./Main.css";

const Main: React.FC = () => {
  return (
    <div className="full_main_page">
      <div className="inner_main_page">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={() => (<div />)} />
            <Route path="/login" component={Login} />
            {/* TODO: other path handling */}
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default Main;
