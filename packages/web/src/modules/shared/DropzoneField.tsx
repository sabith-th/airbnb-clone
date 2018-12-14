import { FieldProps } from "formik";
import * as React from "react";
import Dropzone from "react-dropzone";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name },
  form: { setFieldValue },
  ...props
}) => {
  return (
    <Dropzone
      multiple={false}
      accept="image/*"
      // tslint:disable-next-line:jsx-no-lambda
      onDrop={([file]) => {
        setFieldValue(name, file);
      }}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop files here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
};
