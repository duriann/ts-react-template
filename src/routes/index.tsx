import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "@/home";
import Admin from "@/admin";

export default (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};
