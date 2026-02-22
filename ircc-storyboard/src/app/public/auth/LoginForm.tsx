import React from 'react'
import { signIn } from 'next-auth/react'

export const LoginForm = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 text-center">
        This app currently supports Google authentication.
      </p>
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/private/prompt' })}
        className="w-full py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Continue with Google
      </button>
    </div>
  )
}
