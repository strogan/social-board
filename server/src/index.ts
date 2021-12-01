import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

import { UserResolver } from "./resolvers/user";
import cors from "cors";
import { createConnection } from "typeorm";
/*Redis*/

import session from "express-session";
import connectRedis from "connect-redis";

import Redis from "ioredis";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import path from "path";
/*end*/

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "socials",
    username: "postgres",
    password: "04121997myki",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User],
  });

  await conn.runMigrations();

  //await Post.delete({}); delete all posts

  const app = express();
  //app.set("trust proxy", 1);

  /*redis*/
  const RedisStore = connectRedis(session);

  const redis = new Redis(); //can pass url to redis

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),

      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },

      saveUninitialized: false,
      secret: "secretword",
      resave: false,
    })
  );

  /*redis end*/

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false /*{ origin: "http://localhost:3000" }*/,
  });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });

  //await orm.em.nativeInsert(Post, {title:"second posy"}) second way for insert data, but need to do auto fields
};

main().catch((err) => console.error(err));
