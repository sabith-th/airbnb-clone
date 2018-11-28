import { NormalizedErrorMap } from "@abb/controller";
import { Button, Form, Icon } from "antd";
import { Field, FormikProps, withFormik } from "formik";
import * as React from "react";
import { InputField } from "../../shared/InputField";

const FormItem = Form.Item;

interface FormValues {
  email: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          className="login-form"
          style={{ minWidth: 300 }}
          onSubmit={handleSubmit}
        >
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Reset Passoword
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    email: ""
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
