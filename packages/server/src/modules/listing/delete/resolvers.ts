import { Listing } from "../../../entity/Listing";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      if (!session.userId) {
        throw new Error("Not Authenticated");
      }

      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error("Listing does not exist");
      }

      if (session.userId !== listing.userId) {
        throw new Error("Not Authorized");
      }

      await Listing.remove(listing);

      return true;
    }
  }
};
