import bcrypt from "bcrypt";
import isEmail from "isemail";
import { isAdmin, isAuthenticated, isSameUser } from "./util";

class UserAPI {
  constructor({ user, db }) {
    this.user = user;
    this.db = db;
  }

  getAll = () => {
    if (!isAuthenticated(this.user) || !isAdmin(this.user)) return null;
    return this.db.query.users();
  };

  getById = id => {
    if (
      !isAuthenticated(this.user) ||
      !isSameUser(this.user, id) ||
      !isAdmin(this.user)
    )
      return null;

    return this.db.query.user({ where: { id: id } });
  };

  getSelf = () => {
    if (!isAuthenticated(this.user))
      throw new Error("You are not authenticated");

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

export default UserAPI;
