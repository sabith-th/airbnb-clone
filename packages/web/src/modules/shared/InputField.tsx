import { Form, Input, InputNumber } from "antd";
import { FieldProps } from "formik";
import * as React from "react";

const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    useNumberComponent?: boolean;
  }
> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  label,
  useNumberComponent = false,
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  const Comp = useNumberComponent ? InputNumber : Input;
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? "error" : "success"}
      hasFeedback={touched[field.name] ? true : false}
      label={label}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberComponent
            ? (newValue: any) => setFieldValue(field.name, newValue)
            : onChange
        }
      />
    </FormItem>
  );
};
