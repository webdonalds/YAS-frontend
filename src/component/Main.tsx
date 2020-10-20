import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";

const Main: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={()=>(<div />)} />
      <Route path="/login" component={Login} />
      {/* TODO: other path handling */}
    </Switch>
  </BrowserRouter>
);

export default Main;
