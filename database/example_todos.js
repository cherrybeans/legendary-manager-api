var example_todos = [
  {
    description: "This is a green task",
    priority: "IMPORTANTURGENT",
    dueDate: new Date(),
    reminder: new Date(),
    completed: false
  },
  {
    description: "This is a red task",
    priority: "NOTIMPORTANTNOTURGENT",
    dueDate: null,
    reminder: new Date(),
    completed: false
  },
  {
    description: "This is a blue task",
    priority: "IMPORTANTNOTURGENT",
    dueDate: new Date(),
    reminder: new Date(),
    completed: false
  },
  {
    description: "This is a orange task",
    priority: "NOTIMPORTANTURGENT",
    dueDate: new Date(),
    reminder: null,
    completed: false
  }
];

module.exports = example_todos;
