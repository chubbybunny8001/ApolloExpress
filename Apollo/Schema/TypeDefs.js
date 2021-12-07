const { gql } = require("apollo-server-express");

const typeDefs = gql`
  #Users is for non Auth Users DB
  type Users {
    user_id: Int!
    first_name: String!
    last_name: String!
    married: Boolean!
    user_bio: String!
    user_email: String!
  }

  type Shark {
    shark_id: Int!
    shark_name: String
    years_old: Int
    shark_family: String
  }

  #User is for Authed Users DB
  type User {
    username: String!
    first_name: String!
    last_name: String!
    user_email: String!
    password: String!
    user_bio: String
  }

  type AuthResp {
    user: User!
    token: String!
  }
  # Queries
  type Query {
    #Basic Queries
    hello: String!
    goodbye: String!
    rollDice(numDice: Int!, numSides: Int): [Int!]

    #No Authorization DB
    getOneUser(user_id: Int!): [Users!]
    getUsersByLastName(last_name: String!): [Users]
    getAllUsers: [Users!]
    getAllSharks: [Shark!]

    #Authorization Queries.
    authenticateUser(email: String!, password: String!): AuthResp!
  }
  # Mutations
  type Mutation {
    createUser(
      first_name: String!
      last_name: String!
      married: Boolean!
      user_bio: String!
      user_email: String!
    ): Users!

    registerUser(
      username: String!
      first_name: String!
      last_name: String!
      user_email: String!
      password: String!
      user_bio: String
    ): AuthResp!
  }
`;

module.exports = { typeDefs };
