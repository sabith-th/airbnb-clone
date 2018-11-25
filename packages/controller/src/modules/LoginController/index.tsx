import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: LoginMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });
    const errors = (response as any).data.login.errors;
    const sessionId = (response as any).data.login.sessionId;

    if (errors) {
      return normalizeErrors(errors);
    }

    if (sessionId && this.props.onSessionId) {
      this.props.onSessionId(sessionId);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(C);
