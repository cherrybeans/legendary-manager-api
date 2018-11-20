export const TODO_ADDED = "TODO_ADDED";

export const Subscription = {
  todoCreated: {
    subscribe: (root, args, { pubsub }, info) =>
      pubsub.asyncIterator([TODO_ADDED])
  }
};

export default Subscription;
