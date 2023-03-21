const express = require("express");
//  import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

// import mongodb connection
const db = require("./config/connection");

const PORT = process.env.PORT || 3000;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of an apollo server with the GraphQL schema data
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // listen for connection to be made
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};

// call the function to start the server
startApolloServer(typeDefs, resolvers);
