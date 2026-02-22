import React from 'react'
import { signIn } from 'next-auth/react'

export const SignupForm = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 text-center">
        New accounts are created automatically when you sign in with Google.
      </p>
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/private/prompt' })}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Sign up with Google
      </button>
    </div>
  )
}
