
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  console.warn(
    "[auth] MONGODB_URL is not set. Falling back to the in-memory adapter — users and sessions will not persist. Set MONGODB_URL in the deployment environment."
  );
}

const client = mongoUrl ? new MongoClient(mongoUrl) : undefined;
const db = client ? client.db("BazarDor") : undefined;

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : undefined),

  trustedOrigins: async (request) => {
    const origins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://*.vercel.app",
      "https://bazar-dor-a-7.vercel.app",
      "https://bazar-dor-a-7-pf7ny8xvd-akash-dey1.vercel.app",
      ...(process.env.BETTER_AUTH_URL
        ? [process.env.BETTER_AUTH_URL]
        : []),
      ...(process.env.VERCEL_URL
        ? [`https://${process.env.VERCEL_URL}`]
        : []),
      ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
        : []),
    ];

    if (request) {
      const origin = request.headers?.get?.("origin");
      const referer = request.headers?.get?.("referer");

      if (origin && origin !== "null") origins.push(origin);

      if (referer) {
        try {
          const url = new URL(referer);
          if (url.origin && url.origin !== "null") {
            origins.push(url.origin);
          }
        } catch {}
      }
    }

    return origins;
  },

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      requireLocalEmailVerified: false,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  ...(client && db ? { database: mongodbAdapter(db, { client }) } : {}),
});
