import { ChangePasswordController } from "@abb/controller";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChangePasswordView } from "./ui/ChangePasswordView";

export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{ key: string }>
> {
  submit = async (values: any) => {
    console.log(values);
    return null;
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
            // tslint:disable-next-line
            submit={({ newPassword }) => submit({ key, newPassword })}
          />
        )}
      </ChangePasswordController>
    );
  }
}
