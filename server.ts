const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const corsOptions = {
  origin: "http://localhost:4000/graphql",
  credentials: true,
};

type Input = {
  name: string!;
  scheduleExpression: string!;
  enabled: boolean!;
};

const typeDefs = gql`
  type Query {
    Jobs: [Job]
  }

  type Mutation {
    addJob(input: JobInput!): Boolean!
    removeJob(id: ID!): Boolean!
  }

  type Job {
    name: String!
    scheduleExpression: String!
    enabled: Boolean!
  }
  input JobInput {
    name: String!
    scheduleExpression: String!
    enabled: Boolean!
  }
`;

const resolvers = {
  Query: {
    Jobs: () => {
      return [
        {
          name: "First developer",
          scheduleExpression: "this is first schedule",
          enabled: true,
        },
        {
          name: "Second Developer",
          scheduleExpression: "this is second schedule",
          enabled: true,
        },
      ];
    },
  },
  Mutation: {
    addJob: (input: Input) => {
      return input;
    },
  },
};

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    corsOptions: corsOptions,
    Headers: ["Access-Control-Allow-Origin"],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const app = express();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
