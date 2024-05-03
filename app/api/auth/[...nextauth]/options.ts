import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User, Session, getServerSession } from 'next-auth';
import directus from '@/lib/directus';
import { readMe, withToken } from '@directus/sdk';
import { JWT } from 'next-auth/jwt';
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { AdapterUser } from 'next-auth/adapters';

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch('http://122.51.12.238:8055/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        console.log('---/auth/login:', user);
        // If no error and we have user data, return it
        if (!res.ok && user) {
          throw new Error('Email address or password is invalid');
        }
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      console.log('---[next-auth]callback jwt:', {token, account, user});
      if (account && user && account.type === 'credentials') {
        const userData = await directus.request(
          withToken(
            user.data.access_token as string,
            readMe({
              fields: ['id', 'first_name', 'last_name'],
              // fields: ['*'],
            })
          )
        );
        console.log('---callback-jwt userData:', userData);
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;
    },
    async session({ session, token, user }: { session: Session; token: any; user: AdapterUser }) {
      console.log('---[next-auth]callback-session:', { session, token, user });
      if (!session.user) {
        console.log('Session.user notfound')
        return session
      }
      const newSession = {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          ...token.user,
        }
      }
      console.log('---callback newSession:', newSession);
      return newSession;
    },
    async signIn({ user, account, profile, email, credentials }){
      console.log('---[next-auth]callback-signIn:', { user, account, profile, email, credentials });
      try {
        // 将 google 或 github 三方登录信息写入数据库
        return true
      } catch (error) {
        return false
      }
    }
  },
};

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    accessToken?: string;
    refreshToken?:string;
  };
}

export async function getCurrentUser(){
  const session = await getServerSession(options) as SessionInterface

  return session
}