import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';



export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name:'credentials',
            credentials : {
                email: { label: 'email', type:'text'},
                password: { label: 'password', type:'password'},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password){
                    throw new Error('Invalid credentials');
                }

                const user= await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error('Invalid Credentials');
                }
                

                const isCorrectPassword= await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error('Invalid Credentials');
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    isAdmin: user.isAdmin,
                };
            }
                
        })
    ],callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.isAdmin = user.isAdmin;
          }
          return token;
        },
    
        async session({ session, token }) {
          if (session?.user && token) {
            session.user.id = token.id as string;
            session.user.isAdmin = token.isAdmin as boolean;
          }
          return session;
        },
      },
    pages : {
        signIn:'/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}

export default NextAuth(authOptions);