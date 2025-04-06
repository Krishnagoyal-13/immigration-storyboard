'use client'

import { useState } from 'react'
import { LoginForm } from '@/app/public/auth/LoginForm'
import { SignupForm } from '@/app/public/auth/SignUpForm'
import { MapPinIcon, ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <MapPinIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome to your immigration assistant!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Log in or sign up to begin your personalized journey.
        </p>

        <div className="flex mb-8">
          <button
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500 border-b border-gray-200'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500 border-b border-gray-200'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="transition-opacity duration-200">
          {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>

        <button
  onClick={() => signIn('google', { callbackUrl: '/private/prompt' })}
  className="w-full py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
>
  Continue with Google
</button>
      </div>
    </div>
  )
}