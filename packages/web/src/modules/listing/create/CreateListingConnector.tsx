import { Button, Form } from "antd";
import { Formik } from "formik";
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

export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>,
  State
> {
  state = {
    page: 0
  };

  submit = (values: any) => {
    console.log(values);
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
        {props => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              className="login-form"
              style={{ minWidth: 300 }}
              onSubmit={props.handleSubmit}
            >
              {pages[this.state.page]}
              <FormItem>
                {this.state.page === pages.length - 1 ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                  >
                    Create Listing
                  </Button>
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
