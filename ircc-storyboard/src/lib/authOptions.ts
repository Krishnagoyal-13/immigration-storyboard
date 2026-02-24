import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/public/auth",
    error: "/public/auth",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        if (user.email) {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          })
        } else {
          console.warn("Google sign-in succeeded without an email claim")
        }
      } catch (error) {
        // Do not block OAuth login when DB sync fails (e.g. transient DB outage)
        console.error("User profile sync failed during sign-in:", error)
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`

      try {
        const parsedUrl = new URL(url)
        if (parsedUrl.origin === baseUrl) return url
      } catch {
        // ignore invalid callback URL
      }

      return `${baseUrl}/private/prompt`
    },
  },
}
