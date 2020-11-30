import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";

import "./Main.css";

const Main: React.FC = () => (
  <div className="full_main_page">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={()=>(<div />)} />
        <Route path="/login" component={Login} />
        {/* TODO: other path handling */}
      </Switch>
    </BrowserRouter>
  </div>
  
);

export default Main;
