const { ApolloError } = require("apollo-server-errors");
const { compare, hash } = require("bcrypt");

const knex = require("knex")({
  client: process.env.CLIENT,
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DBPORT,
  },
  useNullAsDefault: true,
});
//Inside these functions is where you would put
//your SQL or Postgres query EX: SELECT * FROM USER
const resolvers = {
  Query: {
    //Basic Queries
    hello() {
      return "Hello World!";
    },
    goodbye() {
      return "Goodbye World!";
    },
    rollDice(parent, args) {
      var rollNums = [];
      var dice = args.numDice;
      var sides = args.numSides;
      for (var i = 0; i < dice; i++) {
        rollNums.push(1 + Math.floor(Math.random() * (sides || 6)));
      }
      return rollNums;
    },

    //No Authorization User DB
    getOneUser(parent, args) {
      var id = args.user_id;
      return knex("users").select("*").where("user_id", id);
    },

    getUsersByLastName(parent, args) {
      var last_name = args.last_name;
      return knex("users")
        .select("*")
        .where("last_name", last_name)
        .orderBy("user_id");
    },

    getAllUsers() {
      return knex("users").select("*").orderBy("user_id");
    },

    //Shark Queries
    getAllSharks() {
      return knex("sharks").select("*").orderBy("shark_id");
    },

    //Authorization Queries
    authenticateUser: async (_, { username, password }, { User }) => {
      try {
        // Find user by ...
        let user = await knex("user").select("*").where("username", username);
        if (!user) {
          throw new Error("User Not Found");
        }
        // Check for password
        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect Password");
        }
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }

      // Issue New Authentication Token
    },
  },
  Mutation: {
    async createUser(parent, args) {
      const newUser = args;
      return await knex
        .insert({
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          married: newUser.married,
          user_bio: newUser.user_bio,
          user_email: newUser.user_email,
        })
        .returning("user_id")
        .into("users")
        .catch((err) => {
          throw new Error("User Already Exists!");
        })
        .then((id) => {
          return knex.select("*").from("users").where("user_id", id[0]);
        })
        .then((rows) => {
          return rows[0];
        });
    },

    //Auth User Registration
    async registerUser(_, args, { User }) {
      let { username, email } = args;
      // First Check if the Username is already Taken
      let user;
      user = await knex("user").select("*").where("username", username);
      // Check if email is taken.
      // Create new User in DB
      // Hash the password.
      // Save the user to the database
      // Issue the Auth Token
    },
  },
};

module.exports = { resolvers };
