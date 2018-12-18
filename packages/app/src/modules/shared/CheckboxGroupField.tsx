import { FieldProps } from "formik";
import * as React from "react";
import { CheckBox } from "react-native-elements";

export class CheckboxGroupField extends React.Component<
  FieldProps<any> & { options: string[] }
> {
  onPress = (optionName: string, checked: boolean) => {
    const {
      field,
      form: { setFieldValue }
    } = this.props;
    if (checked) {
      setFieldValue(
        field.name,
        field.value.filter((x: string) => x !== optionName)
      );
    } else {
      setFieldValue(field.name, [...field.value, optionName]);
    }
  };

  render() {
    const {
      field: { value },
      options
    } = this.props;

    return (
      <React.Fragment>
        {options.map(option => {
          const checked = value.includes(option);
          return (
            <CheckBox
              key={option}
              title={option}
              checked={checked}
              // tslint:disable-next-line:jsx-no-lambda
              onPress={() => this.onPress(option, checked)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
