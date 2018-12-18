import { withCreateListing, WithCreateListing } from "@abb/controller";
import { Field, Formik } from "formik";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { RouteComponentProps } from "react-router-native";
import { InputField } from "../../shared/InputField";

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
  picture: any;
}

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing
> {
  submit = async (
    values: FormValues
    // { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log(values);
    // await this.props.createListing(values);
    // setSubmitting(false);
  };

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
          amenities: [],
          picture: null
        }}
        onSubmit={this.submit}
      >
        {({ isSubmitting: _, handleSubmit, isValid: __ }) => (
          <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ScrollView style={{ padding: 20, marginTop: 30 }}>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>
                Create Listing
              </Text>
              <Field
                name="name"
                placeholder="Name"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="category"
                placeholder="Category"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="description"
                placeholder="Description"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="price"
                placeholder="Price"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="latitude"
                placeholder="Latitude"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="longitude"
                placeholder="Longitude"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="beds"
                placeholder="Beds"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Field
                name="guests"
                placeholder="Guests"
                component={InputField}
                containerStyle={{ width: "100%" }}
                autoCapitalize="none"
              />
              <Button
                style={{ marginTop: 30 }}
                title="Add"
                onPress={handleSubmit}
              />
            </ScrollView>
          </View>
        )}
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
