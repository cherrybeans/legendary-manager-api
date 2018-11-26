var example_todos = [
  {
    description: "This is a green task",
    priority: "IMPORTANTURGENT",
    dueDate: new Date(),
    reminder: new Date(),
    completed: false,
    useremail: "sigridkvamme@gmail.com"
  },
  {
    description: "This is a red task",
    priority: "NOTIMPORTANTNOTURGENT",
    dueDate: null,
    reminder: new Date(),
    completed: false,
    useremail: "anna@arendale.com"
  },
  {
    description: "This is a blue task",
    priority: "IMPORTANTNOTURGENT",
    dueDate: new Date(),
    reminder: new Date(),
    completed: false,
    useremail: "anna@arendale.com"
  },
  {
    description: "This is a orange task",
    priority: "NOTIMPORTANTURGENT",
    dueDate: new Date(),
    reminder: null,
    completed: false,
    useremail: "elsa@arendale.com"
  }
];

var example_users = [
  {
    name: "Admin - Sigrid Marita Kvamme",
    email: "sigridkvamme@gmail.com",
    password: "Helloworlditsanice world",
    isAdmin: true
  },
  {
    name: "Pleb - Anna Princess",
    email: "anna@arendale.com",
    password: "DoYouWannaBuildASnowman"
  },
  {
    name: "Pleb - Elsa Queen",
    email: "elsa@arendale.com",
    password: "GoAwayAnna"
  }
];

module.exports = { example_users, example_todos };
