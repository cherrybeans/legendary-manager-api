import { TODO_ADDED, TODO_UPDATED, TODO_DELETED } from "./constants";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();

const Mutation = {
  createToDo: async (root, { input }, context, info) => {
    const todo = await context.models.ToDo.createToDo(
      {
        ...input
      },
      info
    );
    context.pubsub.publish(TODO_ADDED, { todoCreated: todo });
    return { todo };
  },

  deleteToDo: async (root, { input }, context, info) => {
    const todo = context.models.ToDo.deleteToDo({ ...input }, info);
    context.pubsub.publish(TODO_DELETED, { todoDeleted: todo });
    return { todo };
  },

  updateToDo: async (root, { input }, context, info) => {
    const todo = await context.models.ToDo.updateToDo(
      {
        ...input
      },
      info
    );
    context.pubsub.publish(TODO_UPDATED, { todoUpdated: todo });
    return { todo };
  },

  toggleToDoCompleted: async (root, { input }, context, info) => {
    const todo = await context.models.ToDo.toggleToDoCompleted(
      {
        ...input
      },
      info
    );
    context.pubsub.publish(TODO_UPDATED, { todoUpdated: todo });
    return { todo };
  },

  signup: async (root, { input }, context, info) => {
    const user = await context.models.User.createUser(input, info);
    return {
      token: jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      )
    };
  },

  // How is login a mutation really?
  login: async (root, { input }, context) => {
    const user = await context.db.query.user({ where: { email: input.email } });
    // This is to increase security by not saying if the email address is used for an account or not (intro to hacking yo). Though most seem to not do this. I will until further research shows otherwise.
    if (!user) {
      throw new Error("Incorrect email or password");
    }
    const valid = await bcrypt.compare(input.password, user.password);
    // Still not saying whether it was the email address or password that was wrong.
    if (!valid) {
      throw new Error("Incorrect email or password");
    }
    // return json web token
    return {
      token: jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )
    };
  }
};

export default Mutation;
