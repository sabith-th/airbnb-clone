import { ChangePasswordController } from "@abb/controller";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChangePasswordView } from "./ui/ChangePasswordView";

export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{ key: string }>
> {
  onFinish = () => {
    this.props.history.push("/login");
  };

  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;

    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView
            token={key}
            submit={submit}
            onFinish={this.onFinish}
          />
        )}
      </ChangePasswordController>
    );
  }
}
