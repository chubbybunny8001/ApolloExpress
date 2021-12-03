const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    first_name: String!
    last_name: String!
    married: Boolean!
  }

  type Shark {
    id: Int!
    shark_name: String!
    years_old: Int!
    shark_family: String!
  }

  # Queries
  type Query {
    hello: String!
    goodbye: String!
    rollDice(numDice: Int!, numSides: Int): [Int!]
    getOneUser(id: Int!): User
    getUsersByLastName(last_name: String!): [User]
    getAllUsers: [User!]!
  }
  # Mutations
  type Mutation {
    createUser(
      id: Int!
      first_name: String!
      last_name: String!
      married: Boolean!
    ): User!
  }
`;

module.exports = { typeDefs };
