import { Icon } from "antd";
import { Field } from "formik";
import * as React from "react";
import { DropzoneField } from "../../../shared/DropzoneField";
import { InputField } from "../../../shared/InputField";

export const Page1 = () => (
  <React.Fragment>
    <Field
      name="name"
      prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Name"
      component={InputField}
      label="Name of the Listing"
    />
    <Field
      name="category"
      prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Category"
      component={InputField}
      label="Category"
    />
    <Field
      name="description"
      prefix={<Icon type="file" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Description"
      component={InputField}
      label="About the listing"
    />
    <Field name="picture" component={DropzoneField} />
  </React.Fragment>
);
