const Query = {
  todo: (root, args, context, info) => {
    return context.models.ToDo.getById({ id: args.id, info });
  },

  todos: (root, args, context, info) => {
    return context.models.ToDo.getGroupByUser({
      priority: args.priority,
      info
    });
  },

  countTodos: async (root, args, context, info) => {
    return context.models.User.countTodos();
  },

  // fetch the profile of currently authenticated user (or null if not authenticated)
  me: (root, args, context, info) => {
    return context.models.User.getSelf();
  },

  user: (root, args, context, info) => {
    return context.models.User.getById({ id: args.id, info });
  },

  users: (root, args, context, info) => {
    return context.models.User.getAll({ info });
  }
};

export default Query;
