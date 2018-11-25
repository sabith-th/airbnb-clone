import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });
    const register = (response as any).data.register;
    if (register) {
      return normalizeErrors(register);
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
