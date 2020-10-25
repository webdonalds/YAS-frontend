import React from "react";
import ReactDOM from "react-dom";
import Main from "./component/Main";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

const App: React.SFC = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);