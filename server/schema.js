import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime

  enum Priority {
    IMPORTANTURGENT
    IMPORTANTNOTURGENT
    NOTIMPORTANTURGENT
    NOTIMPORTANTNOTURGENT
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    todos: [ToDo]!
  }

  type ToDo {
    id: ID!
    priority: Priority!
    description: String!
    completed: Boolean!
    reminder: DateTime
    dueDate: DateTime
    user: User!
  }

  type Query {
    todo(id: ID!): ToDo
    todos(
      searchString: String
      filter: Priority
      offset: Int
      limit: Int
    ): [ToDo]!
    countTodos: Int!
    """
    Queries for the current user
    """
    me: User
  }

  type Mutation {
    createToDo(
      priority: Priority!
      description: String!
      completed: Boolean!
      reminder: DateTime
      dueDate: DateTime
      userId: ID!
    ): ToDo!
    deleteToDo(id: ID!): ToDo
    updateToDo(id: ID!): ToDo

    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String): String
  }

  type Subscription {
    todoCreated: ToDo
  }
`;

export default typeDefs;
