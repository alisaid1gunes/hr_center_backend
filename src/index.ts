import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users/user.resolver";
import { AppDataSource } from "./data-source";
import { graphqlUploadExpress } from "graphql-upload";
import { DummyResolver } from "./dummies/dummy.resolver";
import { CvParserResolver } from "./cv-parser/cv-parser.resolver";

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, DummyResolver, CvParserResolver],
  });
  const server = new ApolloServer({ schema });

  await AppDataSource.initialize();

  const app = express();
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: "700kb",
    },
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
