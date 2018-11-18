const fetch = require("node-fetch");
const example_todos = require("./example_todos.js");

var mutation = `
  mutation AddToDo(
    $priority: String!
    $description: String!
    $completed: Boolean!
  ) {
    createToDo(
      data: {
        priority: $priority
        description: $description
        completed: $completed
      }
    ) {
      description
      priority
    }
  }
`;

example_todos.forEach(todo => {
  fetch("http://localhost:4466", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: mutation,
      variables: todo
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data));
});
