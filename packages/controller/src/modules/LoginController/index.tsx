import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;

interface Props {
  children: (
    data: {
      submit: (
        values: LoginMutationVariables
      ) => Promise<{
        [key: string]: string;
      } | null>;
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
    const login = (response as any).data.login;
    if (login) {
      return normalizeErrors(login);
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
