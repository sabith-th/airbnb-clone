import { RegisterController } from "@abb/controller";
import * as React from "react";
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: {submit: any}) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
