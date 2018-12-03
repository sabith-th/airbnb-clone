import { Listing } from "../../../entity/Listing";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    findListings: async () => {
      return Listing.find();
    }
  }
};
