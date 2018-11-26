import { TODO_ADDED, TODO_UPDATED, TODO_DELETED } from "./constants";

export const Subscription = {
  todoCreated: {
    subscribe: (root, args, { pubsub }, info) =>
      pubsub.asyncIterator([TODO_ADDED])
  },
  todoUpdated: {
    subscribe: (root, args, { pubsub }, info) =>
      pubsub.asyncIterator([TODO_UPDATED])
  },
  todoDeleted: {
    subscribe: (root, args, { pubsub }, info) =>
      pubsub.asyncIterator([TODO_DELETED])
  }
};

export default Subscription;
