import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("BazarDor");

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
      ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
      ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
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
          const u = new URL(referer);
          if (u.origin && u.origin !== "null") origins.push(u.origin);
        } catch {}
      }
    }

    return origins;
  },
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});