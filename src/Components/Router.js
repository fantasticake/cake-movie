import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Movies from "../Routes/Movies";
import Tvs from "../Routes/Tvs";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";

export default ({ children }) => {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/" exact component={Movies}></Route>
        <Route path="/movies" exact component={Movies}></Route>
        <Route path="/tvs" exact component={Tvs}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/movies/:id" exact component={Detail}></Route>
        <Route path="/tvs/:id" exact component={Detail}></Route>
        <Redirect from="*" to="/"></Redirect>
      </Switch>
    </Router>
  );
};
