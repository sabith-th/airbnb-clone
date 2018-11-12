import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";

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
    data: { submit: (values: any) => Promise<null> }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<ChildMutateProps<Props, any, any>> {
  submit = async (values: any) => {
    console.log(values);
    const response = await this.props.mutate({
      variables: values
    });
    console.log(response);
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const RegisterController = graphql(registerMutation)(C);
