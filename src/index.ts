import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users/user.resolver";
import { connectDB } from "./data-source";
import { graphqlUploadExpress } from "graphql-upload";
import { DummyResolver } from "./dummies/dummy.resolver";
import { CvParserResolver } from "./cv-parser/cv-parser.resolver";
import { Container } from "typeorm-typedi-extensions";
import { useContainer } from "typeorm";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  useContainer(Container);
  await connectDB();
  const schema = await buildSchema({
    resolvers: [UserResolver, DummyResolver, CvParserResolver],
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    cache: new InMemoryLRUCache(),
    introspection: true,
  });

  const app = express();
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: "700kb",
    },
  });
  app.use(cors());
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
