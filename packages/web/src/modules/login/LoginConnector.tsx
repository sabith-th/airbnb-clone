import { LoginController } from "@abb/controller";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} onFinish={this.onFinish} />}
      </LoginController>
    );
  }
}
