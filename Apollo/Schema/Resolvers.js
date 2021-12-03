const { userData } = require("../mockData");
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
      var id = args.id;
      return userData.filter((user) => {
        return user.id == id;
      })[0];
    },

    getUsersByLastName(parent, args) {
      var last_name = args.last_name;
      return userData.filter((users) => {
        return users.last_name === last_name;
      });
    },

    getAllUsers() {
      return userData;
    },
  },
  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      userData.push(newUser);
      console.log(newUser);
      return newUser;
    },
  },
};

module.exports = { resolvers };
