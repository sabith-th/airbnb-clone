import { LoginController } from "@abb/controller";
import { SecureStore } from "expo";
import * as React from "react";
import { SESSIONID_KEY } from "../shared/constants";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent {
  saveSessionId = (sessionId: string) => {
    SecureStore.setItemAsync(SESSIONID_KEY, sessionId);
  };

  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
