//  define types of data we'll be working with

// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    stores: [Store]
    games: [Game]
}

  type Store {
    _id: ID
    storeName: String
    createdAt: String
    username: String
    games: [Game]
  }

  type Game {
    _id: ID
    gameBrand: String
    gameType: String
    machineNumber: Int
    reportId: String
    storeId: String
    storeName: String
  }

  type Query {
    users:[User]
    user(username:String, _id: ID): User
    store(_id: ID, storeName: String): Store
    stores(_id:ID, username: String, storeName: String): [Store]
    game(_id: ID, storeId: ID, storeName: String): Game
    games(username: String, storeId: ID, storeName: String): [Game]
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
