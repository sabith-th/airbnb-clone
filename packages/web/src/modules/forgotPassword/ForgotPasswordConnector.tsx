import { ForgotPasswordController } from "@abb/controller";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ForgotPasswordView } from "./ui/ForgotPasswordView";

export class ForgotPasswordConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/reset-password-sent", {
      message:
        "A password reset link has been sent to your email. Follow the link to reset your password."
    });
  };

  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => (
          <ForgotPasswordView submit={submit} onFinish={this.onFinish} />
        )}
      </ForgotPasswordController>
    );
  }
}
