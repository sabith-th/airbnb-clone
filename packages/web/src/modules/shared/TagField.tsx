import { Form, Select } from "antd";
import { FieldProps } from "formik";
import * as React from "react";

const FormItem = Form.Item;

export const TagField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, errors, setFieldValue },
  label,
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? "error" : "success"}
      hasFeedback={touched[field.name] ? true : false}
      label={label}
    >
      <Select
        {...field}
        {...props}
        mode="tags"
        style={{ width: "100%" }}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={(newValue: any) => setFieldValue(field.name, newValue)}
      />
    </FormItem>
  );
};
