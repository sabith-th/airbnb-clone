import { validUserSchema } from "@abb/common";
import { Field, FormikErrors, FormikProps, withFormik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ marginTop: 200 }}>
        <Field name="email" placeholder="Email" component={InputField} />
        <Field
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          component={InputField}
        />
        <Button title="Register" onPress={handleSubmit} />
      </View>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
