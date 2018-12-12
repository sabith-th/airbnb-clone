import { createWriteStream } from "fs";
import * as shortid from "shortid";
import { Listing } from "../../../entity/Listing";
import { ResolverMap } from "../../../types/graphql-utils";

const uploadDir = "images";

const storeUpload = async ({ stream, filename }: any): Promise<any> => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const { stream, filename } = await upload;
  const { path } = await storeUpload({ stream, filename });
  return path;
};

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data } }, { session }) => {
      const pictureUrl = await processUpload(picture);
      await Listing.create({
        ...data,
        pictureUrl,
        userId: session.userId
      }).save();
      return true;
    }
  }
};
