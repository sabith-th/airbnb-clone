import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import {
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
} from "../../schemaTypes";

const forgotPasswordMutation = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

interface Props {
  children: (
    data: {
      submit: (
        values: SendForgotPasswordEmailMutationVariables
      ) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    SendForgotPasswordEmailMutation,
    SendForgotPasswordEmailMutationVariables
  >
> {
  submit = async (values: SendForgotPasswordEmailMutationVariables) => {
    await this.props.mutate({
      variables: values
    });

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const ForgotPasswordController = graphql<
  Props,
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
>(forgotPasswordMutation)(C);
