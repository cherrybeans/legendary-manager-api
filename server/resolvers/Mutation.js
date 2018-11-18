import { TODO_ADDED } from "./Subscription";

const Mutation = {
  createToDo: async (root, args, { pubsub, db }, info) => {
    const todo = await db.mutation.createToDo(
      {
        data: {
          priority: args.priority,
          description: args.description,
          completed: false,
          reminder: args.reminder ? args.reminder : null,
          dueDate: args.reminder ? args.reminder : null
        }
      },
      info
    );

    pubsub.publish(TODO_ADDED, { todoCreated: todo });

    return todo;
  },

  // Deletes pokemon by name
  deleteToDo: (root, args, context, info) => {
    return context.db.mutation.deleteToDo(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  // Increments the star count of the pokemon by name
  updateToDo: async (root, args, context, info) => {
    return context.db.mutation.updateToDo(
      {
        data: {
          ...args
        },
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

export default Mutation;
