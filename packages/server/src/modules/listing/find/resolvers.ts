import { Listing } from "../../../entity/Listing";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Listing: {
    pictureUrl: (parent, _, { url }) =>
      parent.pictureUrl && `${url}/images/${parent.pictureUrl}`,
    owner: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    findListings: async () => {
      return Listing.find();
    }
  }
};
