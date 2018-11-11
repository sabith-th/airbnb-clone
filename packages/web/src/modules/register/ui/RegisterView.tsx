import { validUserSchema } from "@abb/common";
import { Button, Form, Icon, Input } from "antd";
import { FormikErrors, FormikProps, withFormik } from "formik";
import * as React from "react";

const FormItem = Form.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const {
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      errors
    } = this.props;
    const invalidEmail = touched.email && errors.email;
    const invalidPassword = touched.password && errors.password;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          className="login-form"
          style={{ minWidth: 300 }}
          onSubmit={handleSubmit}
        >
          <FormItem
            help={invalidEmail}
            validateStatus={invalidEmail ? "error" : "success"}
            hasFeedback={true}
          >
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem
            help={invalidPassword}
            hasFeedback={true}
            validateStatus={invalidPassword ? "error" : "success"}
          >
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Register
            </Button>
            Or <a href="">Login</a>
          </FormItem>
        </Form>
      </div>
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
