const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    user_id: Int!
    first_name: String!
    last_name: String!
    user_bio: String!
    married: Boolean!
  }

  type Shark {
    shark_id: Int!
    shark_name: String
    years_old: Int
    shark_family: String
  }

  # Queries
  type Query {
    hello: String!
    goodbye: String!
    rollDice(numDice: Int!, numSides: Int): [Int!]
    getOneUser(user_id: Int!): [User!]
    getUsersByLastName(last_name: String!): [User]
    getAllUsers: [User!]
    getAllSharks: [Shark!]
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
