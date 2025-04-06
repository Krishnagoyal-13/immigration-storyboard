import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import { prisma } from "@/lib/prisma" // Make sure this path is correct

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email!,
              image: user.image,
            },
          })
        }

        return true
      } catch (error) {
        console.error("SignIn error:", error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      return "/private/prompt"
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
