'use client'

import { useRouter } from 'next/navigation'
import {
  GraduationCapIcon,
  BriefcaseIcon,
  HomeIcon,
  UsersIcon,
} from 'lucide-react'

export const NavigationCards = () => {
  const router = useRouter()

  const cards = [
    {
      icon: <GraduationCapIcon className="h-8 w-8 text-blue-600" />,
      title: '🎓 Student Visa',
      description:
        'Guidance for international students seeking to study in Canada',
    },
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
      title: '💼 Work Permit',
      description:
        'Information for those looking to work temporarily in Canada',
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-blue-600" />,
      title: '🇨🇦 PR (Express Entry)',
      description: 'Permanent residency through Express Entry system',
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-blue-600" />,
      title: '👨‍👩‍👧 Family Sponsorship',
      description: 'Sponsor your family members to join you in Canada',
    },
  ]

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What kind of help are you looking for?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => router.push('/auth')}
              className="bg-white border border-gray-100 hover:border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
