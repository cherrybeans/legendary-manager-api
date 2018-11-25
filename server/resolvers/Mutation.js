import { TODO_ADDED, TODO_UPDATED, TODO_DELETED } from "./constants";

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
    const user = await context.models.User.createUser(input);
    if (user) return { token: new Buffer(email).toString("base64") };
  },

  login: async (root, { input }, context) => {
    console.log("input", input);
    const user = await context.db.query.user({ where: input });
    if (user) return { token: new Buffer(input.email).toString("base64") };
  }
};

export default Mutation;
