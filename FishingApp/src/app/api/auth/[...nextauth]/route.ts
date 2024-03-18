import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDb } from '../../../../../lib/mongodb';
import User from '../../../../../models/user';
import bcrypt from 'bcryptjs'

interface IUser {
  email: string,
  password: string
}



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials){
        const { email, password } = <IUser>credentials
        try {
          await connectMongoDb()
          const user = await User.findOne({email})

          if(!user){
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if(!passwordsMatch){
            return null;
          }
          console.log(user)
          return user

        } catch (error) {
          console.log(error)
        }

      
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };