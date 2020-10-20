import React from "react";
import ReactDOM from "react-dom";
import Main from "./component/Main";

const App: React.SFC = () => (
  <Main />
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);