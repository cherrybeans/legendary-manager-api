const Query = {
  todo: (root, args, context, info) => {
    return context.db.query.toDo(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },

  todos: (root, args, context, info) => {
    const where = args.searchString
      ? {
          description_contains: args.searchString
        }
      : {};
    return context.db.query.toDoes({ where, orderBy: args.orderBy }, info);
  },

  countTodos: async (root, args, context, info) => {
    const postsConnection = await context.db.query.toDoesConnection(
      {},
      `{ aggregate { count } }`
    );
    return postsConnection.aggregate.count;
  },

  // fetch the profile of currently authenticated user (or null if not authenticated)
  me: async (root, args, context, info) => {
    return await context.models.User.getSelf();
  },

  user: (root, args, context, info) => {
    return context.models.User.getById({ id: args.id, info });
  },
  // Which behaviour should this have when not permissions? null, empty list or list with what you have permission to see, like at least yourself? (might be better for a frontend?)
  users: (root, args, context, info) => {
    return context.models.User.getAll({ info });
  }
};

export default Query;
