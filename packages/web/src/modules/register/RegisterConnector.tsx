import { RegisterController } from "@abb/controller";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/confirm-email", {
      message: "Confirm your email address to login"
    });
  };

  render() {
    return (
      <RegisterController>
        {({ submit }) => (
          <RegisterView submit={submit} onFinish={this.onFinish} />
        )}
      </RegisterController>
    );
  }
}
