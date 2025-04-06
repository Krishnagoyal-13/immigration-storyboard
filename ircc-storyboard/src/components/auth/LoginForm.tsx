import React from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'


export const LoginForm = () => {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add authentication logic here
    router.push('/dashboard')
  }
  // Inside your component
<button
  onClick={() => signIn('google')}
  className="w-full py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
>
  Continue with Google
</button>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="text-right">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Log In
      </button>
    </form>
  )
}
