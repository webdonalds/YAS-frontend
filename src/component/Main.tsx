import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GetLogin from "../hooks/GetLogin";
import { getSavedLoginThunk } from "../modules/auth/authThunk";
import AddVideo from "./content/AddVideo/AddVideo";
import Video from "./content/Video/Video";
import Header from "./content/Header/Header";
import Home from "./content/Home/Home";
import MyPage from "./content/MyPage/MyPage";

import "./Main.css";

const Main: React.FC = () => {
  const { initialized } = GetLogin();

  const dispatch = useDispatch();
  if(!initialized) {
    dispatch(getSavedLoginThunk());
  }

  const bodyComponent = initialized ? (
    <>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/my-page" component={MyPage} />
        <Route path="/add-video" render={({match}) => <AddVideo isUpdate={false} match={match} />} />
        <Route path="/modify-video/:postId" render={({match}) => <AddVideo isUpdate={true} match={match} />} />
        <Route path="/video/:postId" render={({match}) => <Video match={match} />} />
      </Switch>
    </>
  ) : null;

  return (
    <BrowserRouter>
      <div className="full_main_page container">
        <div className="inner_main_page">
          <Header />
          {bodyComponent}
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Main;
