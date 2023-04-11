// functions we connect to each query and mutation and perform CRUD

const { AuthenticationError } = require('apollo-server-express');
const { User, Store, Game } = require("../models");

const resolvers = {
    Query: {
        // -----  GET all games by username, storeId -----
        games: async (parent, { username, storeId, storeName }) => { 
            const params = (username, storeId, storeName) ? { username, storeId, storeName } : {};
            return await Game.find(params).sort({ createdAt: -1 })
                .populate('storeName');
         },
        // -----  GET one game -----
        game: async (parent, { _id }) => { 
            return await Game.findOne({ _id });
         },
    // -----  GET all stores -----
        stores: async (parent, { username, storeName }) => {
          const params = (username, storeName) ? { username, storeName } : {};
            return await Store.find(params).sort({ createdAt: -1 })
                .populate('games');
        },
     // -----  GET one store -----
        store: async (parent, { _id, storeName }) => { 
            return await Store.findOne({ _id, storeName })
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
    Mutation: {
        // -----  ADD a user -----
        addUser: async (parent, args) => {  
            const user = await User.create(args);
            return user;
        },
        // -----  LOGIN a user -----
        login: async (parent,{email,password}) => { 
            // find user by email
            const user = await User.findOne({ email });

            // if no user found, throw an error
            if (!user) { 
                throw new AuthenticationError('Incorrect credentials');
            }
            // check if password is correct
            const correctPw = await user.isCorrectPassword(password);

            // if password is incorrect, throw an error
            if (!correctPw) { 
                throw new AuthenticationError('Incorrect credentials');
            }
            // return user
            return user;
         }
    },
};

module.exports = resolvers;
