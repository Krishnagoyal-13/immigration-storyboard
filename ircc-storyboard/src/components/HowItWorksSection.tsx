import React from 'react'
import { MessageSquareIcon, MapIcon, BellIcon } from 'lucide-react'
export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <MessageSquareIcon className="h-10 w-10 text-blue-600" />,
      title: 'Tell us your goal',
      description:
        "Share your immigration objectives, like 'I want to study in Canada' or 'How do I apply for Express Entry?'",
    },
    {
      icon: <MapIcon className="h-10 w-10 text-blue-600" />,
      title: 'We generate your roadmap',
      description:
        'Receive a step-by-step journey with timelines, requirements, and personalized recommendations',
    },
    {
      icon: <BellIcon className="h-10 w-10 text-blue-600" />,
      title: 'Get weekly updates by email',
      description:
        'Stay informed with reminders about next steps, document deadlines, and policy changes',
    },
  ]
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-full mb-6">
                {step.icon}
              </div>
              <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
