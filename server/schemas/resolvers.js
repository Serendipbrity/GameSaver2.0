// functions we connect to each query and mutation and perform CRUD

const { User, Store } = require("../models");

const resolvers = {
  Query: {
        stores: async (parent, { username }) => {
          const params = username ? { username } : {};
      return Store.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
