import { backend } from "@/app/lib/axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, _req) {
        const res = await fetch("http://localhost:3333/sessions", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const { token } = await res.json();

        if (res.ok && token) {
          const res = await fetch("http://localhost:3333/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const { user } = await res.json();
          if (res.ok && user) {
            backend.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const teste = { ...token, ...user };

      return teste;
    },
    async session({ session, token }) {
      session.user = { ...token } as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
