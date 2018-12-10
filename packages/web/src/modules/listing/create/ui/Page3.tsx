import { Icon } from "antd";
import { Field } from "formik";
import * as React from "react";
import { InputField } from "../../../shared/InputField";

export const Page3 = () => (
  <React.Fragment>
    <Field
      name="latitude"
      prefix={<Icon type="environment" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Latitude"
      component={InputField}
      label="Latitude"
      useNumberComponent={true}
    />
    <Field
      name="longitude"
      prefix={<Icon type="compass" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Longitude"
      component={InputField}
      label="Longitude"
      useNumberComponent={true}
    />
  </React.Fragment>
);
