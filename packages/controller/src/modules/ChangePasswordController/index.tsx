import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import {
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
} from "../../schemaTypes";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

interface Props {
  children: (
    data: {
      submit: (
        values: ForgotPasswordChangeMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ForgotPasswordChangeMutation,
    ForgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: ForgotPasswordChangeMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });
    const forgotPasswordChange = (response as any).data.forgotPasswordChange;

    if (forgotPasswordChange) {
      return normalizeErrors(forgotPasswordChange);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
>(forgotPasswordChangeMutation)(C);
