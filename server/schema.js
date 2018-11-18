import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime

  enum Priority {
    IMPORTANTURGENT
    IMPORTANTNOTURGENT
    NOTIMPORTANTURGENT
    NOTIMPORTANTNOTURGENT
  }

  type Counter {
    count: Int!
    countStr: String
  }

  type ToDo {
    id: ID!
    priority: Priority!
    description: String!
    completed: Boolean!
    reminder: DateTime
    dueDate: DateTime
  }

  type Query {
    todo(id: ID!): ToDo
    todos(
      searchString: String
      filterByType: Priority
      offset: Int
      limit: Int
    ): [ToDo]!
    countTodos: Int!

    whatsForDinner: String!
  }

  type Mutation {
    createToDo(
      priority: Priority!
      description: String!
      completed: Boolean!
      reminder: DateTime
      dueDate: DateTime
    ): ToDo!
    deleteToDo(name: String): ToDo
    updateToDo(name: String): ToDo
  }

  type Subscription {
    counter: Counter!
    todoCreated: ToDo
  }
`;

export default typeDefs;
