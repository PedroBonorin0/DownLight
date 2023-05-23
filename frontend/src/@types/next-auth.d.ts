import NextAuth from "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatar_url: string;
      role: string;
      created_at: string;
    };
  }
}
