/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.JWT_TOKEN,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, //7 days
    },
    pages: {
        signIn: "/en/login",
        newUser: "/en/sign-up",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "string" },
                password: { type: "string" },
            },
            async authorize(credentials: any) {
                const { access, refresh, mobile_details, ...rest } = credentials;

                return {
                    ...rest,
                    mobile_details: JSON.parse(mobile_details),
                    tokens: {
                        access,
                        refresh,
                    },
                } as any;
            },
        }),
    ],
    callbacks: {
        // called after the authorize function is finished
        jwt: async ({ token, user, session, trigger }) => {
            const maxAge = 7 * 24 * 60 * 60 * 1000;
            if (user) {
                token.id = user.id;
                token.createdAt = Date.now();
                token.expiresAt = Date.now() + maxAge;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const userObj = user as unknown as any;
                return {
                    ...token,
                    ...userObj,
                };
            }

            if (trigger === "update") {
                token = { ...token, ...session };
                token.expiresAt = Date.now() + maxAge;
            }

            return token;
        },
        // called after the jwt function is finished
        session: ({ session, token }) => {

            const { sub, image, ...rest } = token;

            session.user.id = token.id as string;
            session.expires = new Date(token.expiresAt as number).toISOString();

            return {
                ...session,
                user: {
                    ...session.user,
                    ...rest,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
        },
    },
};
