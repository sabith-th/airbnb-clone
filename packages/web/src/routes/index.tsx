import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginConnector } from "../modules/login/LoginConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
    </Switch>
  </BrowserRouter>
);
