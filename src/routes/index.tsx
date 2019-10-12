import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "src/app/home";
import login from "src/app/login";

export default (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={login}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};
