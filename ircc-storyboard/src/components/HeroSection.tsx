'use client'
import Image from 'next/image'
import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
export const HeroSection = () => {
  const router  = useRouter()
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get Personalized Guidance for Your Canadian Immigration Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Powered by AI and updated with real immigration rules, we help you
            navigate the process with clarity.
          </p>
          <button
            onClick={() => router.push('/public/auth')}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-8 rounded-lg flex items-center group"
          >
            Start Now
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/canada-immigration.jpeg"
            alt="Canadian immigration guide with passport and maple leaf"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
