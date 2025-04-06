import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/public/auth', // Redirect if not logged in
  },
})

export const config = {
  matcher: ["/private/:path*"], // Protect all routes under /private/*
}
