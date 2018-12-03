import { Listing } from "../../../entity/Listing";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input }, { session }) => {
      if (!session.userId) {
        throw new Error("Not Authenticated");
      }

      await Listing.create({
        ...input,
        pictureUrl: "",
        userId: session.userId
      }).save();
      return true;
    }
  }
};
