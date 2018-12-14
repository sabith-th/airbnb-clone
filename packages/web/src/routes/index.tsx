import { AuthRouter } from "@abb/controller";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ChangePasswordConnector } from "../modules/changePassword/ChangePasswordConnector";
import { ForgotPasswordConnector } from "../modules/forgotPassword/ForgotPasswordConnector";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { DeleteListingConnector } from "../modules/listing/delete/DeleteListing";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { TextPage } from "../modules/TextPage";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route
        exact={true}
        path="/forgot-password"
        component={ForgotPasswordConnector}
      />
      <Route
        exact={true}
        path="/change-password/:key"
        component={ChangePasswordConnector}
      />
      <Route path="/m/" component={TextPage} />
      <Route path="/listings" component={FindListingsConnector} />
      <AuthRouter path="/create-listing" component={CreateListingConnector} />
      <AuthRouter path="/delete-listing" component={DeleteListingConnector} />
    </Switch>
  </BrowserRouter>
);
