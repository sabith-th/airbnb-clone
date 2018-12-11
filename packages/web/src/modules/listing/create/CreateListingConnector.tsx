import { NewPropsCreateListing, withCreateListing } from "@abb/controller";
import { Button, Form } from "antd";
import { Formik, FormikActions } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Page3 } from "./ui/Page3";

const FormItem = Form.Item;
// tslint:disable-next-line:jsx-key
const pages = [<Page1 />, <Page2 />, <Page3 />];

interface FormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  beds: number;
  guests: number;
  amenities: string[];
}

interface State {
  page: number;
}

class C extends React.PureComponent<
  RouteComponentProps<{}> & NewPropsCreateListing,
  State
> {
  state = {
    page: 0
  };

  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    await this.props.createListing(values);
    setSubmitting(false);
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  render() {
    return (
      <Formik<FormValues, {}>
        initialValues={{
          name: "",
          category: "",
          description: "",
          price: 0,
          latitude: 0,
          longitude: 0,
          beds: 0,
          guests: 0,
          amenities: []
        }}
        onSubmit={this.submit}
      >
        {({ isSubmitting, handleSubmit, isValid }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              className="login-form"
              style={{ minWidth: 300 }}
              onSubmit={handleSubmit}
            >
              {pages[this.state.page]}
              <FormItem>
                {this.state.page === pages.length - 1 ? (
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "100%" }}
                      disabled={!isValid || isSubmitting}
                    >
                      Create Listing
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    className="login-form-button"
                    style={{ width: "100%" }}
                    onClick={this.nextPage}
                  >
                    Next Page
                  </Button>
                )}
              </FormItem>
            </Form>
          </div>
        )}
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
