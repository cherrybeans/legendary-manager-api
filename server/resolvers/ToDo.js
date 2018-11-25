const ToDo = {
  user: async (root, args, context, info) => {
    const creatorOfTodo = await context.db.query.toDo(
      { where: { id: root.id } },
      `{ user { id } }`
    );

    return context.models.User.getById({ id: creatorOfTodo.user.id, info });
  }
};

export default ToDo;
