module.exports = {
  client: {
    includes: [__dirname + "/src/**/*.tsx"],
    service: {
      name: "graphql-service",
      url: "http://localhost:4000"
    }
  }
};
