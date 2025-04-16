'use client'

import { Footer } from '@/components/Footer'
import { LinkedinIcon, TwitterIcon } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
}

export default function knowtheteamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Krishna Goyal',
      role: 'Machine Learning Engineer – LLM Integration',
      bio: 'Worked on integrating Large Language Models into the system for dynamic user guidance. Focused on prompt design, fine-tuning, and response handling for the AI assistant.',
      image: '/team/krishna.png',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Saatvik Birla',
      role: 'Frontend Developer & UI/UX Designer',
      bio: 'Led the development of the user interface using Next.js, Tailwind CSS, and modern frontend practices. Ensured responsive design and seamless user experience across devices.',
      image: '/team/saatvik.png',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Apoorva Jadhav',
      role: 'Backend & Database Developer',
      bio: 'Designed and implemented the database schema for storing user progress and prompts. Managed data flow between frontend, backend, and AI system for reliable performance.',
      image: '/team/apoorva.png',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Bhavya Narang',
      role: 'Natural Language Processing Engineer',
      bio: "Contributed to building the NLP pipeline, including tokenization, query interpretation, and step-by-step output generation aligned with IRCC guidelines.",
      image: '/team/bhavya.png',
      linkedin: '#',
      twitter: '#',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="w-full bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              We're a diverse team of immigration experts, technologists, and
              customer success professionals dedicated to simplifying the
              Canadian immigration journey.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="w-full md:w-1/3">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h2>
                    <p className="text-blue-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex gap-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TwitterIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're always looking for passionate individuals who want to make a
              difference in the lives of aspiring Canadian immigrants.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
