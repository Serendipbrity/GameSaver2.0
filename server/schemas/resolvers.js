// functions we connect to each query and mutation and perform CRUD

const { User, Store } = require("../models");

const resolvers = {
  Query: {
    stores: async () => {
      return Store.find().sort({ createdAt: -1 });
    }
  }
};

module.exports = resolvers;
