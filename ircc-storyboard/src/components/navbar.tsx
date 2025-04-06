'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Immigration Assistant
      </Link>

      <div className="flex items-center gap-4">
        {status === 'authenticated' ? (
          <>
            <span className="text-gray-700">Hello, {session.user?.name?.split(' ')[0]}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/auth' })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
