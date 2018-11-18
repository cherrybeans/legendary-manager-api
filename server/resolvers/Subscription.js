export const TODO_ADDED = "TODO_ADDED";

export const Subscription = {
  todoCreated: {
    subscribe: (root, args, { pubsub }, info) =>
      pubsub.asyncIterator([TODO_ADDED])
  },
  counter: {
    subscribe: (root, args, { pubsub }, info) => {
      const channel = Math.random()
        .toString(36)
        .substring(2, 15); // random channel name
      let count = 0;
      setInterval(
        () => pubsub.publish(channel, { counter: { count: count++ } }),
        2000
      );
      return pubsub.asyncIterator(channel);
    }
  }
};

export default Subscription;
