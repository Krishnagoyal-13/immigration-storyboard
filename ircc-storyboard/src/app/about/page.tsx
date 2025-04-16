'use client'

import { useRouter } from 'next/navigation'
import { Footer } from '@/components/Footer'
import {
  BrainCircuitIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeIcon,
} from 'lucide-react'

export default function AboutPage() {
  const router = useRouter()

  const features = [
    {
      icon: <BrainCircuitIcon className="h-6 w-6" />,
      title: 'AI-Powered Guidance',
      description:
        'Advanced algorithms provide personalized immigration advice based on your unique situation.',
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: 'Up-to-date Information',
      description:
        'Always current with the latest IRCC guidelines and immigration policies.',
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: '24/7 Assistance',
      description:
        'Get answers to your immigration questions anytime, anywhere.',
    },
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: 'Global Accessibility',
      description:
        'Supporting immigrants from all over the world in their journey to Canada.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="w-full bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
              About Our Mission
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              We're dedicated to making the Canadian immigration process more
              accessible and understandable for everyone through innovative AI
              technology.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Our Commitment to Your Success
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  The Canadian Immigration Guidance System was born from a
                  simple idea: make immigration guidance accessible to everyone.
                  Using advanced AI technology, we've created a platform that
                  provides personalized, accurate immigration advice 24/7.
                </p>
                <p>
                  Our system is constantly updated with the latest immigration
                  policies and requirements, ensuring you always receive current
                  and accurate information. We understand that every immigration
                  journey is unique, which is why our AI-powered system creates
                  customized guidance for your specific situation.
                </p>
                <p>
                  Whether you're a student, worker, or looking to join family in
                  Canada, we're here to help you navigate every step of your
                  immigration journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Ready to Start Your Journey?
            </h2>
            <button
              onClick={() => router.push('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center transition-colors"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
