import bcrypt from "bcrypt";
import isEmail from "isemail";
import { isAdmin, isAuthenticated, isSameUser } from "./util";

export class UserAPI {
  constructor({ user, db }) {
    this.user = user;
    this.db = db;
  }

  getAll = ({ info }) => {
    if (!isAuthenticated(this.user) || !isAdmin(this.user)) return null;
    return this.db.query.users({}, info);
  };

  getById = ({ id, info }) => {
    if (
      !isAuthenticated(this.user) ||
      !isSameUser(this.user, id) ||
      !isAdmin(this.user)
    )
      return null;

    return this.db.query.user({ where: { id: id } }, info);
  };

  getSelf = () => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");

    return this.getById(this.user.id);
  };

  createUser = async ({ name, email, password }) => {
    if (!isEmail.validate(email))
      throw new Error(
        "The email entered is not valid. Please enter a valid email."
      );

    return this.db.mutation.createUser({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10)
      }
    });
  };
}

export class ToDoAPI {
  constructor({ user, db }) {
    this.user = user;
    this.db = db;
  }

  getById = id => {
    if (!isAuthenticated(this.user) || !isSameUser(this.user, id)) return null;

    return this.db.query.user({ where: { id: id } });
  };

  createToDo = ({ priority, description, reminder, dueDate }) => {
    if (!isAuthenticated(this.user))
      throw new Error("You have not logged in. Log in and try again.");

    return this.db.mutation.createToDo({
      data: {
        priority: priority,
        description: description,
        reminder: reminder,
        dueDate: dueDate,
        user: { connect: { id: this.user.id } }
      }
    });
  };
}
