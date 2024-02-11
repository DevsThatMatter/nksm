import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:
        'https://accounts.google.com/o/oauth2/auth?response_type=code&hd=nitkkr.ac.in'
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && user.email.endsWith('@nitkkr.ac.in')) {
        return true;
      } else {
        return false;
      }
    }
  }
})