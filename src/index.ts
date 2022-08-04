import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {UserResolver} from "./resolvers/UserResolver";
import {AppDataSource} from "./data-source";
import {graphqlUploadExpress} from "graphql-upload";
import {DummyResolver} from "./resolvers/DummyResolver";

const startServer = async () => {
    const schema = await buildSchema({
        resolvers:[UserResolver,DummyResolver],
    });
    const server = new ApolloServer({schema, });

    await AppDataSource.initialize();

    const app = express();
    await server.start();
    app.use(graphqlUploadExpress(   ));
    server.applyMiddleware({ app, bodyParserConfig: {
            limit: '700kb'
        } });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();