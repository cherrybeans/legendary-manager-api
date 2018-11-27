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
    useremail: "annabuildasnowman@arendale.com"
  },
  {
    description: "This is a blue task",
    priority: "IMPORTANTNOTURGENT",
    dueDate: new Date(),
    reminder: new Date(),
    completed: false,
    useremail: "annabuildasnowman@arendale.com"
  },
  {
    description: "This is a orange task",
    priority: "NOTIMPORTANTURGENT",
    dueDate: new Date(),
    reminder: null,
    completed: false,
    useremail: "elsagoaway@arendale.com"
  }
];

var example_users = [
  {
    name: "Admin - Admin Adminsen",
    email: "admin@adminsen.com",
    // pwd: Helloworlditsaniceworld
    password: "$2b$10$KIkrKyBQeg9r2MNcaG2c8uPhnFxF3O/0FhXFK4pznqIM88B4qOTKi",
    isAdmin: true
  },
  {
    name: "Pleb - Anna Princess",
    email: "annabuildasnowman@arendale.com",
    // pwd: DoYouWannaBuildASnowman
    password: "$2b$10$tf83gJn/AxP76EUvYk1fBerrmopzwL3oiBL2RQUapcaWn4J1GDVpq"
  },
  {
    name: "Pleb - Elsa Queen",
    email: "elsagoaway@arendale.com",
    // pwd: GoAwayAnna
    password: "$2b$10$HOGahgI7IBxj6N.3LV60BOyA7RiMgQdJy4qMSarD/5l5wYlQ00AUS"
  }
];

module.exports = { example_users, example_todos };
