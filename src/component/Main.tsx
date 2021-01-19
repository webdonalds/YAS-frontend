import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Add from "./content/Add/AddVideo";
import Header from "./content/Header/Header";
import Home from "./content/Home/Home";

import "./Main.css";

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="full_main_page container">
        <div className="inner_main_page">
          <Header />
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/add" component={Add} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Main;
