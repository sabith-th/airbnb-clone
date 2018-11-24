import { LoginController } from "@abb/controller";
import * as React from "react";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent {
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
