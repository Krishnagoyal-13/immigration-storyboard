import React from 'react'
import { BrainCircuitIcon } from 'lucide-react'
export const AboutSection = () => {
  return (
    <section className="w-full py-16 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="bg-white p-6 rounded-full shadow-lg">
              <BrainCircuitIcon className="h-24 w-24 text-blue-600" />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              About the System
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Our AI assistant understands your immigration needs and generates
              a personalized plan using official IRCC guidelines.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Using advanced Natural Language Processing, we analyze your unique
              situation and provide tailored advice that's accurate and
              up-to-date with the latest immigration policies.
            </p>
            <p className="text-lg text-gray-700">
              Get real-time query handling, personalized story-based guidance,
              and timely email notifications to keep your immigration journey on
              track.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
