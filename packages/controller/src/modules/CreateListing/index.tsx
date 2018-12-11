import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateListingMutation,
  CreateListingMutationVariables
} from "../../schemaTypes";

export const createListingMutation = gql`
  mutation CreateListingMutation(
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $latitude: Float!
    $longitude: Float!
    $beds: Int!
    $guests: Int!
    $amenities: [String!]!
  ) {
    createListing(
      input: {
        name: $name
        category: $category
        description: $description
        price: $price
        latitude: $latitude
        longitude: $longitude
        beds: $beds
        guests: $guests
        amenities: $amenities
      }
    )
  }
`;

export interface NewPropsCreateListing {
  createListing: (variables: CreateListingMutationVariables) => void;
}

export const withCreateListing = graphql<
  any,
  CreateListingMutation,
  CreateListingMutationVariables,
  NewPropsCreateListing
>(createListingMutation, {
  props: ({ mutate }) => ({
    createListing: async variables => {
      if (!mutate) {
        return;
      }

      await mutate({
        variables
      });
    }
  })
});
