import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GetLogin from "../hooks/GetLogin";
import { getSavedLoginThunk } from "../modules/auth/authThunk";
import AddVideo from "./content/Add/AddVideo";
import Header from "./content/Header/Header";
import Home from "./content/Home/Home";
import MyPage from "./content/MyPage/MyPage";

import "./Main.css";

const Main: React.FC = () => {
  const { userInfo, tokens, error } = GetLogin();
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();

  const initialize = () => {
    // if not initialized
    if(!initialized) {
      if(userInfo==null && tokens==null && error==null) {
        dispatch(getSavedLoginThunk());
      }
      setInitialized(true);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initialize, [initialized]);

  return (
    <BrowserRouter>
      <div className="full_main_page container">
        <div className="inner_main_page">
          <Header />
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/my-page" component={MyPage} />
              <Route path="/add-video" render={({match}) => <AddVideo isUpdate={false} match={match} />} />
              <Route path="/modify-video/:postId" render={({match}) => <AddVideo isUpdate={true} match={match} />} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Main;
