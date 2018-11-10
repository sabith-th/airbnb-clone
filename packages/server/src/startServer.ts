import * as connectRedis from "connect-redis";
import "dotenv/config";
import * as RateLimit from "express-rate-limit";
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import * as passport from "passport";
import { Strategy } from "passport-twitter";
import * as RateLimitRedisStore from "rate-limit-redis";
import "reflect-metadata";
import { REDIS_SESSION_PREFIX } from "./constants";
import { User } from "./entity/User";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { createTestConnection } from "./testUtils/createTestConnection";
import { createTypeORMConnection } from "./utils/createTypeORMConnection";
import { genSchema } from "./utils/genSchema";

const SESSION_SECRET = "hellothere";
const RedisStore = connectRedis(session);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request
    })
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000,
      max: 100,
      delayMs: 0
    })
  );

  server.express.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis as any,
        prefix: REDIS_SESSION_PREFIX
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    })
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  server.express.get("/confirm/:id", confirmEmail);

  const connection =
    process.env.NODE_ENV === "test"
      ? await createTestConnection(true)
      : await createTypeORMConnection();

  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string,
        includeEmail: true
      },
      async (_: any, __: any, profile: any, cb: any) => {
        const { id, emails } = profile;
        const query = connection
          .getRepository(User)
          .createQueryBuilder("user")
          .where("user.twitterId = :id", { id });
        let email: string | null = null;
        if (emails) {
          email = emails[0].value;
          query.orWhere("user.email = :email", { email });
        }
        let user = await query.getOne();
        if (!user) {
          user = await User.create({
            twitterId: id,
            email
          }).save();
        } else if (!user.twitterId) {
          user.twitterId = id;
          user = await user.save();
        }
        return cb(null, { id: user.id });
      }
    )
  );

  server.express.use(passport.initialize());

  server.express.get("/auth/twitter", passport.authenticate("twitter"));

  server.express.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { session: false }),
    (req, res) => {
      (req.session as any).userId = req.user.id;
      // @todo: redirect to frontend
      res.redirect("/");
    }
  );

  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server running on localhost:4000");
  return app;
};
