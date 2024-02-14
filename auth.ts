import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:
        "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=nitkkr.ac.in",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowedToSignIn = user.email && user.email.endsWith('@nitkkr.ac.in');
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
      }
    },
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, newSession, trigger }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: session.user?.id,
        },
      };
    },
  },
});
