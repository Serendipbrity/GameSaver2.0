//  define types of data we'll be working with

// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs 
const typeDefs = gql`
type Store {
    _id: ID
    storeName: String
    createdAt: String
    username: String

}

type Query {
    stores: [Store]
}`;

// export the typeDefs
module.exports = typeDefs;