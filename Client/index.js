function Hello() {
  let resp = "";
  fetch("http://localhost:5005/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ query: "{hello}" }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resp = JSON.stringify(data.data.hello);
    })
    .then(() => {
      alert(resp);
    })
    .catch((err) => console.log(err));
}

function Goodbye() {
  let resp = "";
  fetch("http://localhost:5005/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ query: "{goodbye}" }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resp = JSON.stringify(data.data.goodbye);
    })
    .then(() => {
      alert(resp);
    })
    .catch((err) => console.log(err));
}

let dice = 0;
let sides = 0;

function RollDice() {
  var formData = new FormData(document.querySelector("#diceForm"));
  formData.forEach((input, name) => {
    if (name == "dice") {
      dice = input;
    } else if (name == "sides") {
      sides = input;
    }
  });
  console.log(`Dice: ${dice} Sides: ${sides}`);
  var roll = [];
  fetch("http://localhost:5005/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      query: `
            {
                rollDice(
                    numDice: ${dice}, numSides: ${sides}
                    )
            }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      roll = data.data.rollDice;
    })
    .then(() => {
      alert(`You rolled two six sided dice and got: ${roll}`);
    })
    .catch((err) => console.log(err));
}
const button = document.querySelector("#diceRoll");

button.addEventListener("click", RollDice);
