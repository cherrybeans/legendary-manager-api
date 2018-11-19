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

  whatsForDinner: (root, args, context, info) => {
    // Return null if not admin user (e.g. for seeing all users)
    if (!context.user || !context.user.roles.includes("admin")) return null;

    const idx = Math.floor(Math.random() * dinnerOptions.length);
    const foodChoice = dinnerOptions[idx];
    return `Tonight we eat ${foodChoice}`;
  }
};

export default Query;
