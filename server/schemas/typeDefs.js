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
  }

  type Query {
    users:[User]
    user(username:String, _id: ID!): User
    store(_id: ID!): Store
    stores(username: String): [Store]
    game(_id: ID!): Game
    games(username: String, storeId: ID!): [Game]
  }
`;

// export the typeDefs
module.exports = typeDefs;
