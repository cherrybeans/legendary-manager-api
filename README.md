# The Legendary Manager API

> API for the best todo app evverrr

The backend. GraphQL, Apollo Server, Prisma, PostgreSQL.

## Getting started

Running the backend of this project requires [`node`](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04), [`docker`](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce) and [`docker-compose`](https://docs.docker.com/compose/install/), so go ahead and install those if you want to run the project yourself.

### Setting up

I use `yarn`, but you may use `npm` instead with the equivalent commands.

Clone the project and install dependencies as such:

```sh
$ git clone git@github.com:cherrybeans/legendary-manager-api.git # or if not using ssh git clone https://github.com/cherrybeans/legendary-manager-api.git
$ cd legendary-manager-api
$ yarn # install the project dependencies
$ sudo npm install -g graphql-cli # Needed as prisma deploy uses this in a hook
$ yarn prisma deploy # Create the tables in the database and migrate model
$ cd database && docker-compose up -d # Sets up and hosts the database API at http://localhost:4466/
$ node database/populate_database.js # Populates the database with example data
```

Then you can run the server with `yarn start` and go to [localhost:4000/graphql](http://localhost:4000/graphql) to view the documented interactive playground for the API.

### Useful scripts

In the project directory, you can run:

#### `yarn start`

Run the GraphQL development server. To see the interactive API (the playground), go to [http://localhost:4000/graphql](http://localhost:4000/graphql). There you can see the documentation for the API and interact with it.

#### `yarn graphql playground`

Allows you to see the playground of both the database API and the project API in the same window, which can be useful in development. To use this command without “yarn requires that you have `graphql-cli` installed globally on your computer.

```sh
$ npm install -g graphql-cli
```

#### `yarn prisma deploy`

If making changes to the database model in `database/datamodel.prisma`, you need to run this command afterwards. After deploying the new model, it automatically
updates the schema that is used by the server for database queries. Using this command without “yarn” requires that `prisma` is globally installed on your computer.

```sh
$ npm install -g prisma
```

#### `yarn prisma reset`

Reset/Empty the database. Using this command without “yarn” requires that `prisma` is globally installed on your computer.

```sh
$ npm install -g prisma
```

#### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## A little noob guide on deploying on a Linux server

I used `Apache` to host this project. If you haven’t already installed it on your server, install it with `sudo apt install apache2` or use another tool.

### Prerequisites

The setup of the backend requires that you install [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce), [docker-compose](https://docs.docker.com/compose/install/), [node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04), [prisma](https://www.prisma.io/with-graphql) and [graphql-cli](https://www.npmjs.com/package/graphql-cli). In addition I used the package [forever](https://www.npmjs.com/package/forever) to run the server forever (and not stop hosting when you close the terminal). Install `yarn` as well (to make use of the lock file).

### Steps

```sh
$ scp -r database server package.json <username>@exampledomain.com:~  # Copies the necessary files for running the backend to the server in your home folder
```

Then ssh into your server: `ssh <username>@exampledomain.com`.

```sh
$ git clone git@github.com:cherrybeans/legendary-manager-api.git # or if not using ssh git clone https://github.com/cherrybeans/legendary-manager-api.git
$ cd legendary-manager-api
$ yarn # install the project dependencies
$ sudo npm install -g graphql-cli # Needed as prisma deploy uses this in a hook
$ yarn prisma deploy # Create the tables in the database and migrate model
$ cd database && docker-compose up -d # Sets up and hosts the database API at http://localhost:4466/
$ node database/populate_database.js # Populates the database with example data
```

```sh
$ yarn
$ cd database && sudo docker-compose up -d # Runs prisma and the mysql database in the background
$ yarn prisma deploy
$ cd ..
$ node database/populate_database.js
$ forever start server/ # Run the server in the background
```

Now hopefully everything is up and running! Check it out at [http://exampledomain.com:4000/graphql](http://exampledomain.com:4000/graphql).
