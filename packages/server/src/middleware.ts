const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    throw new Error("User Not Authenticated");
  }
  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated
  }
};
