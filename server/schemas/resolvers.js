// functions we connect to each query and mutation and perform CRUD

const { User, Store, Game } = require("../models");

const resolvers = {
    Query: {
        // -----  GET all games by username, storeId -----
        games: async (parent, { username, storeId }) => { 
            const params = (username, storeId) ? { username, storeId } : {};
            return await Game.find(params).sort({ createdAt: -1 });
         },
        // -----  GET one game -----
        game: async (parent, { _id }) => { 
            return await Game.findOne({ _id });
         },
    // -----  GET all stores -----
        stores: async (parent, { username }) => {
          const params = username ? { username } : {};
            return await Store.find(params).sort({ createdAt: -1 })
                .populate('games');
        },
     // -----  GET one store -----
        store: async (parent, { _id }) => { 
            return await Store.findOne({ _id })
                .populate('games');
        },
      // -----  GET all users -----
        users: async () => { 
            return await User.find()
                // omit the __v and password fields when returning data
            .select('-__v -password')
                .populate('stores')
                .populate('games');
        },
        // -----  GET one user -----
        user: async (parent, { username }) => { 
            return await User.findOne({ username })
                .select('-__v -password')
                .populate('stores')
                .populate('games')
         }
  },
};

module.exports = resolvers;
