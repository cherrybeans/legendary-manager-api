import { gql } from "apollo-server-express";

const typeDefs = gql`
  # Models

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    todos: [ToDo]!
    countTodos: Int!
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

  # Root schema

  type Query {
    """
    Queries for the current user.
    """
    me: User
    """
    Fetch a user by its id.
    """
    user(id: ID!): User
    """
    Fetch all users.
    """
    users: [User!]
    """
    Get how many todos you have.
    """
    countTodos: Int!
    """
    Fetch a todo by its id.
    """
    todo(id: ID!): ToDo
    """
    Fetch all your todos.
    """
    todos: [ToDo]
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
    createToDo(input: createToDoInput!): createToDoPayload
    updateToDo(input: updateToDoInput!): updateToDoPayload
    deleteToDo(input: deleteToDoInput!): deleteToDoPayload
    toggleToDoCompleted(
      input: ToggleToDoCompletedInput!
    ): ToggleToDoCompletedPayload
  }

  type Subscription {
    todoCreated: ToDo
    todoUpdated: ToDo
    todoDeleted: ToDo
  }

  # Inputs and payloads

  input createToDoInput {
    priority: Priority!
    description: String!
    reminder: DateTime
    dueDate: DateTime
  }

  type createToDoPayload {
    todo: ToDo
  }

  input updateToDoInput {
    id: ID!
    priority: Priority
    description: String
    completed: Boolean
    reminder: DateTime
    dueDate: DateTime
  }

  type updateToDoPayload {
    todo: ToDo
  }

  input deleteToDoInput {
    id: ID!
  }

  type deleteToDoPayload {
    todo: ToDo
  }

  input ToggleToDoCompletedInput {
    id: ID!
  }

  type ToggleToDoCompletedPayload {
    todo: ToDo
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # Custom scalars and enums

  scalar DateTime

  enum Priority {
    IMPORTANTURGENT
    IMPORTANTNOTURGENT
    NOTIMPORTANTURGENT
    NOTIMPORTANTNOTURGENT
  }
`;

export default typeDefs;
