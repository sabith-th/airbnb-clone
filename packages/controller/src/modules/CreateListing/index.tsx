import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CreateListingMutation, CreateListingMutationVariables } from "../../schemaTypes";

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
    $picture: Upload
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
        picture: $picture
      }
    )
  }
`;

export interface WithCreateListing {
  createListing: (variables: CreateListingMutationVariables) => void;
}

export const withCreateListing = graphql<
  any,
  CreateListingMutation,
  CreateListingMutationVariables,
  WithCreateListing
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
