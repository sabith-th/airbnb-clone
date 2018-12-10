import { Icon } from "antd";
import { Field } from "formik";
import * as React from "react";
import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page2 = () => (
  <React.Fragment>
    <Field
      name="price"
      prefix={<Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Price"
      component={InputField}
      label="Price"
      useNumberComponent={true}
    />
    <Field
      name="beds"
      prefix={<Icon type="tablet" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Beds"
      component={InputField}
      label="Beds"
      useNumberComponent={true}
    />
    <Field
      name="guests"
      prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Guests"
      component={InputField}
      label="Guests"
      useNumberComponent={true}
    />
    <Field
      name="amenities"
      prefix={<Icon type="wifi" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Amenities"
      component={TagField}
      label="Amenities"
    />
  </React.Fragment>
);
