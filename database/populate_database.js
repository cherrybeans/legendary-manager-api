const fetch = require("node-fetch");
const { example_todos, example_users } = require("./example_seed.js");

var userMutation = `
  mutation AddUsers(
    $name: String!
    $email: String!
    $password: String!
    $isAdmin: Boolean
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        isAdmin: $isAdmin
      }
    ) {
      name
      isAdmin
    }
  }
`;

example_users.forEach(user => {
  fetch("http://localhost:4466", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: userMutation,
      variables: user
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data));
});

var toDoMutation = `
  mutation AddToDo(
    $priority: String!
    $description: String!
    $completed: Boolean!
    $user: User!
  ) {
    createToDo(
      data: {
        priority: $priority
        description: $description
        completed: $completed
        user: $user
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
      query: toDoMutation,
      variables: todo
    })
  })
    .then(r => r.json())
    .then(data => console.log("data returned:", data));
});
