import bcrypt from "bcrypt";
import isEmail from "isemail";
import { isAdmin, isAuthenticated, isSameUser } from "./util";

export class UserAPI {
  constructor({ user, db }) {
    this.user = user;
    this.db = db;
  }

  getAll = ({ info }) => {
    if (!isAuthenticated(this.user) || !isAdmin(this.user)) return [];
    return this.db.query.users({}, info);
  };

  getById = ({ id, info }) => {
    if (
      isAuthenticated(this.user) &&
      (isSameUser(this.user, id) || isAdmin(this.user))
    ) {
      return this.db.query.user({ where: { id } }, info);
    }
    return null;
  };

  getSelf = () => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");
    return this.getById({ id: this.user.id });
  };

  createUser = async ({ name, email, password }) => {
    if (!isEmail.validate(email))
      throw new Error(
        "The email entered is not valid. Please enter a valid email."
      );

    return this.db.mutation.createUser(
      {
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10)
        }
      },
      `{ id email }`
    );
  };

  countTodos = async () => {
    if (isAuthenticated(this.user)) {
      const todosConnection = await this.db.query.toDoesConnection(
        {
          where: { user: { id: this.user.id } }
        },
        `{ aggregate { count } }`
      );
      return todosConnection.aggregate.count;
    }

    return null;
  };
}

export class ToDoAPI {
  constructor({ user, db }) {
    this.user = user;
    this.db = db;
  }

  getById = async ({ id, info }) => {
    if (isAuthenticated(this.user)) {
      const data = await this.db.query.toDo(
        { where: { id } },
        `{ user { id } }`
      );
      if (isSameUser(this.user, data.user.id)) {
        return this.db.query.toDo({ where: { id } }, info);
      }
    }
    return null;
  };

  getGroupByUser = ({ priority, info }) => {
    const where = priority
      ? { where: { user: { id: this.user.id }, priority } }
      : { where: { user: { id: this.user.id } } };

    if (isAuthenticated(this.user)) {
      return this.db.query.toDoes(where, info);
    }
    return null;
  };

  createToDo = ({ priority, description, reminder, dueDate, info }) => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");
    return this.db.mutation.createToDo(
      {
        data: {
          priority,
          description,
          reminder,
          dueDate,
          user: { connect: { id: this.user.id } }
        }
      },
      info
    );
  };

  updateToDo = async ({
    id,
    priority,
    description,
    completed,
    reminder,
    dueDate,
    info
  }) => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");
    const data = await this.db.query.toDo({ where: { id } }, `{ user { id } }`);
    if (isSameUser(this.user, data.user.id)) {
      return this.db.mutation.updateToDo(
        {
          where: { id },
          data: {
            priority,
            description,
            completed,
            reminder,
            dueDate
          }
        },
        info
      );
    }
    throw new Error("Can't touch that");
  };

  toggleToDoCompleted = async ({ id, info }) => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");
    const data = await this.db.query.toDo({ where: { id } }, `{ user { id } }`);
    if (isSameUser(this.user, data.user.id)) {
      const todo = await this.db.query.toDo({ where: { id } }, `{ completed }`);

      return this.db.mutation.updateToDo(
        {
          where: { id },
          data: {
            completed: !todo.completed
          }
        },
        info
      );
    }
    throw new Error("Can't touch that");
  };

  deleteToDo = async ({ id, info }) => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");
    const data = await this.db.query.toDo({ where: { id } }, `{ user { id } }`);
    if (isSameUser(this.user, data.user.id)) {
      return this.db.mutation.deleteToDo({ where: { id } }, info);
    }
    throw new Error("Can't touch that");
  };
}
