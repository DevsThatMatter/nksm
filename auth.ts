import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser, insertUser } from "./lib/actions/auth.actions";

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
    async session({ session }) {
      if (session.user) {
        const user = await getUser(session.user.email!);
        session.user.id = user._id.toString();
        session.user.image = user.Avatar;
        session.user.email = user.Email;
      }
      return session;
    },
    async signIn({ user, profile }) {
      const isAllowedToSignIn =
        user.email && user.email.endsWith("@nitkkr.ac.in");
      if (isAllowedToSignIn && profile) {
        await insertUser({
          Username: profile.email!.substring(0, profile.email!.indexOf("@")),
          Email: profile.email!,
          Avatar: profile.picture!,
          Name: profile.name!,
        });
        return true;
      } else {
        return false;
      }
    },
  },
});
