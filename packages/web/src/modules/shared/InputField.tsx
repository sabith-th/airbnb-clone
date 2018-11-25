import { Form, Input } from "antd";
import { FieldProps } from "formik";
import * as React from "react";

const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode }
> = ({ field, form: { touched, errors }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? "error" : "success"}
      hasFeedback={touched[field.name] ? true : false}
    >
      <Input {...field} {...props} />
    </FormItem>
  );
};
