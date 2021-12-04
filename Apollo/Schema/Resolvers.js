const { userData } = require("../mockData");
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
    // getSingleUser() {},
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

    getAllSharks() {
      return knex("sharks").select("*").orderBy("shark_id");
    },
  },
  Mutation: {
    async createUser(parent, args) {
      const newUser = args;
      knex("users").insert();
      console.log(newUser);
      return newUser;
    },
  },
};

module.exports = { resolvers };
