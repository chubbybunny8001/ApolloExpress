require("dotenv").config();
//Apollo Server
const { ApolloServer } = require("apollo-server-express");
//GraphQL
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");
//Express
const express = require("express");
const app = express();
//Postgres

//Environmental Vars

const port = process.env.PORT;
console.log(process.env.PORT);

let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(port, () => {
  console.log(`SERVER RUNNING AT http://localhost:${port}/graphql`);
});
