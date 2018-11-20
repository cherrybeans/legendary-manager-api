import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Prisma } from "prisma-binding";
import typeDefs from "./schema.js";
import resolvers from "./resolvers";
import fs from "fs";
import https from "https";
import http from "http";
import { PubSub } from "apollo-server";
import jwt from "express-jwt";
import { UserAPI, ToDoAPI } from "./models";

const configurations = {
  // Note: You may need sudo to run on port 443
  production: {
    ssl: true,
    port: process.env.PORT || 443,
    hostname: "example.com",
    debug: false
  },
  development: { ssl: false, port: 4000, hostname: "localhost", debug: false }
};

const environment = process.env.NODE_ENV || "production";
const config = configurations[environment];
const pubsub = new PubSub();
const prisma = new Prisma({
  typeDefs: "database/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  debug: config.debug
});

const getUser = async ({ req }) => {
  // simple auth check on every request with HTTP authorization header
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer(auth, "base64").toString("ascii");
  // find a user by their email (null if not vaild email or does not exist)
  return await prisma.query.user({ where: { email } });
};

const apollo = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    // console.log(response);
    return response;
  },
  // The connection to the database
  context: async req => {
    const user = await getUser(req);
    return {
      models: {
        User: new UserAPI({ user, db: prisma }),
        ToDo: new ToDoAPI({ user, db: prisma })
      },
      db: prisma,
      pubsub
    };
  }
});

const app = express();
apollo.applyMiddleware({ app });

var server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  );
} else {
  server = http.createServer(app);
}

// Add subscription support
apollo.installSubscriptionHandlers(server);

// This `listen` method launches a web-server.
server.listen({ port: config.port }, () => {
  console.log(
    `🚀🦄 Server running at http${config.ssl ? "s" : ""}://${config.hostname}:${
      config.port
    }${apollo.graphqlPath} 🎠🚀`
  );
});
