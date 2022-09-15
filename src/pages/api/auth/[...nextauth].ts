import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Cookies from 'cookies';
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '../../../server/db/client';
import { encode, decode } from 'next-auth/jwt'

const generateSessionToken = () => randomUUID()

const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, {
        useSecureCookies: false,
        adapter: PrismaAdapter(prisma),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_CLIENT_ID || '',
                clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
            }),
            CredentialsProvider({
                id: "credentials",
                name: "Credentials",
                credentials: {
                    username: {
                        label: "Correo electrónico",
                        type: "text",
                        placeholder: "correo",
                    },
                    password: { label: "Password", type: "password" },
                },
                authorize: async (credentials: any) => {
                    const user = await fetch(
                        `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}/api/user/check-credentials`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                accept: "application/json",
                            },
                            body: JSON.stringify(credentials),
                        },
                    )
                        .then((resp) => resp.json())
                    if (user?.error) throw new Error(JSON.stringify({ error: user.error }))
                    if (!user) throw new Error(JSON.stringify({ error: 'Información de login incorrecta' }))
                    return user;
                }
            })
        ],
        callbacks: {
            async signIn({ user }) {
                if (req?.query?.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                    if (user) {
                        const sessionToken = generateSessionToken()
                        const sessionExpiry = fromDate(600)

                        await prisma.session.create({
                            data: {
                                sessionToken: sessionToken,
                                userId: user.id,
                                expires: sessionExpiry
                            }
                        })

                        const cookies = new Cookies(req, res)

                        cookies.set('next-auth.session-token', sessionToken, {
                            expires: sessionExpiry
                        })
                    }
                }

                return true;
            }
        },
        jwt: {
            encode: async ({ token, secret, maxAge }) => {
                if (
                    req?.query?.nextauth?.includes("callback") &&
                    req.query.nextauth.includes("credentials") &&
                    req.method === "POST"
                ) {
                    const cookies = new Cookies(req, res);
                    const cookie = cookies.get("next-auth.session-token");

                    if (cookie) return cookie;
                    else return "";
                }
                // Revert to default behaviour when not in the credentials provider callback flow
                return encode({ token, secret, maxAge });
            },
            decode: async ({ token, secret }) => {
                if (
                    req?.query?.nextauth?.includes("callback") &&
                    req.query.nextauth.includes("credentials") &&
                    req.method === "POST"
                ) {
                    return null;
                }

                // Revert to default behaviour when not in the credentials provider callback flow
                return decode({ token, secret });
            },
        }
    })
}