import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDb } from '../../../../../lib/mongodb';
import User from '../../../../../models/user';
import bcrypt from 'bcryptjs';

interface IUser {
  _id: string;
  email: string;
  password: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials){
        const { email, password } = <IUser>credentials;
        try {
          await connectMongoDb();
          const user = await User.findOne({email});

          if(!user){
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if(!passwordsMatch){
            return null;
          }
          console.log(user);
          return user;

        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session?.user) {
        session.user._id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }: { user: any; token: any }) => {
      if (user) {
        token.sub = user._id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
